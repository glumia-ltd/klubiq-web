export interface EncryptedCardData {
	encryptedCardNumber: string;
	encryptedExpiryMonth: string;
	encryptedExpiryYear: string;
	encryptedCvv: string;
	signature: string;
	timestamp: number;
	nonce: string;
	encryptedPin?: string;
	encryptedCardholderName: string;
}

export class ClientEncryptionUtil {
	private static readonly HMAC_SECRET = import.meta.env.VITE_HMAC_SECRET;
	/**
	 * Encrypts card data using the provided public key
	 * @param publicKey - RSA public key in PEM format
	 * @param cardData - Object containing card information
	 * @returns Encrypted card data with signature
	 */
	static async encryptCardData(
		publicKey: string,
		cardData: {
			cardNumber: string;
			expiryMonth: string;
			expiryYear: string;
			cvv: string;
			pin: string;
			cardholderName: string;
		},
	): Promise<EncryptedCardData> {
		try {
			const timestamp = Date.now();
			const nonce = this.generateNonce();
			// Encrypt each field individually
			const encryptedCardNumber = await this.encryptField(
				publicKey,
				cardData.cardNumber,
			);
			const encryptedExpiryMonth = await this.encryptField(
				publicKey,
				cardData.expiryMonth,
			);
			const encryptedExpiryYear = await this.encryptField(
				publicKey,
				cardData.expiryYear,
			);
			const encryptedCvv = await this.encryptField(publicKey, cardData.cvv);
			const encryptedPin = await this.encryptField(publicKey, cardData.pin);
			const encryptedCardholderName = await this.encryptField(
				publicKey,
				cardData.cardholderName,
			);
			const encryptedPayload = {
				encryptedCardNumber,
				encryptedExpiryMonth,
				encryptedExpiryYear,
				encryptedCvv,
				encryptedPin,
				encryptedCardholderName,
				nonce,
			};
			const signatureData = `${encryptedCardNumber}|${encryptedExpiryMonth}|${encryptedExpiryYear}|${encryptedCvv}|${encryptedCardholderName}|${nonce}`;
			// Create signature
			const signature = await this.createSignature(
				signatureData,
				timestamp,
				publicKey,
			);

			return {
				...encryptedPayload,
				signature,
				timestamp,
			};
		} catch (error) {
			throw new Error(`Encryption failed: ${(error as Error).message}`);
		}
	}

	private static normalizePublicKey(key: string): string {
		return key
			.trim()
			.replace(`-----BEGIN PUBLIC KEY-----`, '')
			.replace(`-----END PUBLIC KEY-----`, '')
			.replace(/\r\n/g, '\n')
			.replace(/\n+/g, '\n')
			.replace(/\s/g, '');
	}

	private static async encryptField(
		publicKey: string,
		data: string,
	): Promise<string> {
		try {
			const encodedData = new TextEncoder().encode(data);

			// Check data size for RSA-2048
			if (encodedData.length > 190) {
				throw new Error(
					`Data too large for RSA-2048: ${encodedData.length} bytes (max: 190)`,
				);
			}

			console.log(`Encrypting data: "${data}" (${encodedData.length} bytes)`);

			const key = await this.importPublicKey(publicKey);
			const encrypted = await crypto.subtle.encrypt(
				{
					name: 'RSA-OAEP',
					hash: 'SHA-256',
				} as RsaOaepParams,
				key,
				encodedData,
			);

			const result = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
			console.log(`Encrypted result length: ${result.length}`);

			return result;
		} catch (error) {
			throw new Error(`Field encryption failed: ${(error as Error).message}`);
		}
	}

	private static async createSignature(
		data: string,
		timestamp: number,
		publicKey: string,
	): Promise<string> {
		try {
			const normalizedKey = this.normalizePublicKey(publicKey);
			const msg = `${data}|${timestamp}|${normalizedKey}`;
			const enc = new TextEncoder();
			const key = await crypto.subtle.importKey(
				'raw',
				enc.encode(this.HMAC_SECRET),
				{ name: 'HMAC', hash: 'SHA-256' },
				false,
				['sign'],
			);
			const sig = await crypto.subtle.sign('HMAC', key, enc.encode(msg));
			return btoa(String.fromCharCode(...new Uint8Array(sig)));
		} catch (error) {
			throw new Error(`Signature creation failed: ${(error as Error).message}`);
		}
	}

	private static generateNonce(): string {
		const array = new Uint8Array(16);
		crypto.getRandomValues(array);
		return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join(
			'',
		);
	}

	private static async importPublicKey(pemKey: string): Promise<CryptoKey> {
		try {
			console.log(`Original PEM key length: ${pemKey.length}`);
			console.log(`PEM starts with: ${pemKey.substring(0, 50)}...`);

			const base64 = pemKey
				.replace(/-----BEGIN PUBLIC KEY-----\s*/, '')
				.replace(/\s*-----END PUBLIC KEY-----/, '')
				.replace(/\s/g, '');

			if (base64.length === 0) {
				throw new Error('Failed to parse PEM key - no base64 data found');
			}

			const binaryString = atob(base64);
			const bytes = new Uint8Array(binaryString.length);
			for (let i = 0; i < binaryString.length; i++) {
				bytes[i] = binaryString.charCodeAt(i);
			}

			console.log(`Importing key with ${bytes.length} bytes`);

			const key = await crypto.subtle.importKey(
				'spki',
				bytes,
				{
					name: 'RSA-OAEP',
					hash: 'SHA-256',
				},
				false,
				['encrypt'],
			);

			console.log('✅ Public key imported successfully');
			return key;
		} catch (error) {
			console.error('❌ Public key import failed:', error);
			throw new Error(`Public key import failed: ${(error as Error).message}`);
		}
	}

	/**
	 * Validates encrypted data structure
	 */
	static validateEncryptedData(data: EncryptedCardData): boolean {
		return !!(
			data.encryptedCardNumber &&
			data.encryptedExpiryMonth &&
			data.encryptedExpiryYear &&
			data.encryptedCvv &&
			data.encryptedPin &&
			data.encryptedCardholderName &&
			data.signature &&
			data.timestamp &&
			data.nonce
		);
	}
}
