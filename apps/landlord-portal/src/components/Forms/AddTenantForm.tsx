
import FormLayout from '../../Layouts/FormLayout';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { omit } from 'lodash';
import { Typography } from '@mui/material';
import {
    KlubiqForm,
    FormField,
    FormGroup,
} from '@klubiq/ui-components';

// API and Store imports
import { useAddNewTenantWithoutLeaseMutation } from '../../store/TenantStore/tenantApiSlice';
import { useAddNewTenantToLeaseMutation } from '../../store/LeaseStore/leaseApiSlice';

// Types and Constants
import { AddTenantFormValues } from '../../shared/type';
import { PERSON_TITLES } from '../../helpers/constants';
import FormSkeleton from '../skeletons/FormSkeleton';
import { consoleError } from '../../helpers/debug-logger';

interface AddTenantFormProps {
    leaseAndUnitDetails: {
        leaseId: string;
        unitId: string;
        unitNumber: string;
        propertyId: string;
        propertyName: string;
    };
    returnPath: string;
    formHeader?: string;
    rentAmountPortion?: boolean;
}

const defaultValues: AddTenantFormValues = {
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    notes: '',
    companyName: '',
    unitId: '',
};

const AddTenantForm = ({
    leaseAndUnitDetails,
    returnPath,
}: AddTenantFormProps) => {
    // State Management
    const [loading, setLoading] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState<AddTenantFormValues>(defaultValues);
    // Hooks
    const navigate = useNavigate();			
    
    // API Mutations with cache configuration
    const [addNewTenantWithoutLease] = useAddNewTenantWithoutLeaseMutation();
    
    const [addNewTenantToLease] = useAddNewTenantToLeaseMutation();

    // Initialize form values
    useEffect(() => {
        if (leaseAndUnitDetails || returnPath) {
            setInitialValues({
                ...defaultValues,
                title: 'Mr',
            });
            setLoading(false);
        }
    }, [leaseAndUnitDetails, returnPath]);

    // Form submission handler
    const onSubmit = async (values: AddTenantFormValues) => {
        try {
            // Prepare request data
            let requestData = omit(values, ['unitId', 'tenantType']);
            
            // Handle tenant type specific fields
            if (values.tenantType === 'company') {
                requestData = omit(requestData, ['firstName', 'lastName', 'title']);
            } else {
                requestData = omit(requestData, ['companyName']);
            }

            // Make API call based on lease details
            await (leaseAndUnitDetails?.leaseId
                ? await addNewTenantToLease(requestData).unwrap()
                : await addNewTenantWithoutLease(omit(requestData, ['leaseId'])).unwrap());


            navigate(returnPath);
            
        } catch (error) {
            // Handle error without resetting form
			consoleError('error in add tenant form', error);
        }
    };

    // Form field definitions
    const tenantFormFields: (FormField | FormGroup)[] = [
        {
            name: 'unitId',
            label: '',
            type: 'text',
            customComponent: (
                <Typography variant='subtitle2'>
                    {leaseAndUnitDetails
                        ? `Add a new tenant to ${leaseAndUnitDetails.propertyName}-${leaseAndUnitDetails.unitNumber}`
                        : 'Add a new tenant to your tenant list'}
                </Typography>
            ),
        },
        {
            name: 'tenantType',
            label: 'Tenant Type',
            type: 'radio',
            required: true,
            radioGroupDirection: 'row',
            options: [
                { value: 'company', label: 'Company' },
                { value: 'individual', label: 'Individual' },
            ],
        },
        {
            name: 'companyName',
            label: 'Company Name',
            type: 'text',
            required: true,
            validation: Yup.string().when('tenantType', {
                is: 'company',
                then: (schema) => schema.required('Company name is required'),
                otherwise: (schema) => schema.notRequired(),
            }),
            showIf: (values) => values.tenantType === 'company',
        },
        {
            name: 'title',
            label: 'Title',
            type: 'select',
            placeholder: 'Select Title',
            options: PERSON_TITLES.map((title) => ({ value: title, label: title })),
            showIf: (values) => values.tenantType === 'individual',
        },
        {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            required: true,
            validation: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .when('tenantType', {
                    is: 'individual',
                    then: (schema) => schema.required('First name is required'),
                    otherwise: (schema) => schema.notRequired(),
                }),
            showIf: (values) => values.tenantType === 'individual',
        },
        {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            required: true,
            showIf: (values) => values.tenantType === 'individual',
            validation: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .when('tenantType', {
                    is: 'individual',
                    then: (schema) => schema.required('Last name is required'),
                    otherwise: (schema) => schema.notRequired(),
                }),
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            required: true,
            validation: Yup.string()
                .email('Invalid email')
                .required('Email is required'),
        },
        {
            name: 'phoneNumber',
            label: 'Phone Number',
            type: 'text',
            required: false,
            validation: Yup.string().matches(/^[0-9]+$/, 'Invalid phone number'),
        },
        {
            name: 'notes',
            label: 'Notes',
            type: 'text',
            rows: 3,
            required: false,
        },
        {
            name: 'leaseId',
            label: '',
            type: 'hidden',
            hidden: true,
            defaultValue: leaseAndUnitDetails?.leaseId,
            predefinedValue: leaseAndUnitDetails?.leaseId,
        },
    ];

    return (
        <FormLayout Header={'Add Tenant'}>
            {loading ? (
                <FormSkeleton rows={tenantFormFields.length} columns={[1, 1, 1]} />
            ) : (
                <KlubiqForm
                    fields={tenantFormFields as FormField[]}
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    enableReset={true}
                    submitButtonText='Add Tenant'
                    resetButtonText='Cancel'
                />
            )}
        </FormLayout>
    );
};

export default AddTenantForm;