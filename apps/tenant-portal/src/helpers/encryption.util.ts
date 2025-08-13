export interface EncryptedCardData {
    encryptedCardNumber: string;
    encryptedExpiryMonth: string;
    encryptedExpiryYear: string;
    encryptedCvv: string;
    signature: string;
    timestamp: string;
    nonce: string;
  }
  
  export class ClientEncryptionUtil {
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
      }
    ): Promise<EncryptedCardData> {
      try {
        const timestamp = new Date().toISOString();
        const nonce = this.generateNonce();
        
        // Create data payload for signing
        const payload = JSON.stringify({
          cardNumber: cardData.cardNumber,
          expiryMonth: cardData.expiryMonth,
          expiryYear: cardData.expiryYear,
          cvv: cardData.cvv,
          timestamp,
          nonce
        });
  
        // Encrypt each field individually
        const encryptedCardNumber = await this.encryptField(publicKey, cardData.cardNumber);
        const encryptedExpiryMonth = await this.encryptField(publicKey, cardData.expiryMonth);
        const encryptedExpiryYear = await this.encryptField(publicKey, cardData.expiryYear);
        const encryptedCvv = await this.encryptField(publicKey, cardData.cvv);
  
        // Create signature
        const signature = await this.createSignature(payload);
  
        return {
          encryptedCardNumber,
          encryptedExpiryMonth,
          encryptedExpiryYear,
          encryptedCvv,
          signature,
          timestamp,
          nonce
        };
      } catch (error) {
        throw new Error(`Encryption failed: ${(error as Error).message}`);
      }
    }
  
    private static async encryptField(publicKey: string, data: string): Promise<string> {
      try {
        // Convert PEM to CryptoKey
        const key = await this.importPublicKey(publicKey);
        
        // Encrypt data
        const encodedData = new TextEncoder().encode(data);
        const encrypted = await crypto.subtle.encrypt(
          {
            name: 'RSA-OAEP',
            hash: 'SHA-256'
          } as RsaOaepParams,
          key,
          encodedData
        );
        
        return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
      } catch (error) {
        throw new Error(`Field encryption failed: ${(error as Error).message}`);
      }
    }
  
    private static async createSignature(data: string): Promise<string> {
      try {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(data);
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
        const hashArray = new Uint8Array(hashBuffer);
        return btoa(String.fromCharCode(...hashArray));
      } catch (error) {
        throw new Error(`Signature creation failed: ${(error as Error).message}`);
      }
    }
  
    private static generateNonce(): string {
      const array = new Uint8Array(16);
      crypto.getRandomValues(array);
      return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }
  
    private static async importPublicKey(pemKey: string): Promise<CryptoKey> {
      // Remove PEM headers and convert to ArrayBuffer
      const base64 = pemKey
        .replace(/-----BEGIN PUBLIC KEY-----/, '')
        .replace(/-----END PUBLIC KEY-----/, '')
        .replace(/\s/g, '');
      
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      return crypto.subtle.importKey(
        'spki',
        bytes,
        {
          name: 'RSA-OAEP',
          hash: 'SHA-256'
        },
        false,
        ['encrypt']
      );
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
        data.signature &&
        data.timestamp &&
        data.nonce
      );
    }
  }