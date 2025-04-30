import * as yup from 'yup';
export const validationSchema = yup.object({
    firstName: yup.string().required('This field is required'),
    lastName: yup.string().required('This field is required'),
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    leaseDetails: yup.object({
        startDate: yup.string().required('This field is required'),
        endDate: yup
            .string()
            .required('This field is required')
            .test(
                'is-end-date-after-start-date',
                'Lease end date must be after the start date',
                function (value) {
                    const { startDate } = this.parent;
                    return (
                        !value || !startDate || new Date(value) > new Date(startDate)
                    );
                },
            ),
        rentAmount: yup.number().required('field is required'),

        propertyName: yup.string().required('This field is required'),
    }),
});

export type formValues = {
    firstName: string;
    lastName: string;
    email: string;
    selectedOption: string;
    phoneNumber: string;
    role: {
        id: number;
        name: string;
    };
    leaseDetails: {
        name: string;
        startDate: string;
        endDate: string;
        unitId: string;
        // rentDueDay: string;
        rentAmount: number | string;
        // securityDeposit: number;
        // isDraft: boolean;
        // paymentFrequency: string;
        // status: string;
        propertyName: string;
        // firstPaymentDate: string;
        unitNumber: string;
    };
};
export type UnitType = {
    area?: { value: number; unit: string };
    bathrooms?: number;
    bedrooms?: number;
    floor?: number | null;
    id?: string;
    images?: string[];
    offices?: number | string | null;
    rentAmount?: string;
    rooms?: null;
    toilets?: 4;
    unitNumber?: string;
};
export type Unit = {
    id?: string;
    unitNumber?: string;
};
export interface propertyName {
    uuid: string;
    units?: Unit[];

}

export interface AddTenantFormProps {
    propertyDetails: {
        uuid: string;
        name: string;
        description: string;
        note: string | null;
        isMultiUnit: boolean;
        bedrooms: number;
        bathrooms: number;
        toilets: number;
        isArchived: boolean;
        units?: Unit[];
        unitCount: number;


    };
}