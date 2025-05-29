import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  //Button,
  Stack,
  IconButton,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
import { FormFieldApi, ArrayFormFieldV1, KlubiqTSFormFields } from '@klubiq/ui-components';
import { AmenitiesDialog } from './AmenitiesDialog';

interface Unit {
  unitNumber: string;
  bedrooms: number | null;
  bathrooms: number | null;
  toilets: number | null;
  rooms: number | null;
  offices: number | null;
  area: {
    value: number | null;
    unit: string;
  };
  amenities: string[];
}

export const UnitsAccordionArray = ({
    fieldApi,
    fieldConfig,
    form,
    maxSubUnits,
  }: {
    fieldApi: FormFieldApi;
    fieldConfig: ArrayFormFieldV1;
    form: any;
    maxSubUnits?: number;
  }) => {
  const units = Array.isArray(fieldApi.state.value) ? fieldApi.state.value as Unit[] : [];
  const [expanded, setExpanded] = useState<number | false>(0);
  const [unitNumbers, setUnitNumbers] = useState<Record<number, string>>({});
  const totalUnits = form.state.values.unitDetails?.totalUnits;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Update unit numbers when units change
  useEffect(() => {
    const newUnitNumbers = units.reduce((acc, unit, idx) => {
      acc[idx] = unit.unitNumber || `Unit ${idx + 1}`;
      return acc;
    }, {} as Record<number, string>);
    setUnitNumbers(newUnitNumbers);
  }, [units]);

  // Watch for unit number field changes
  useEffect(() => {
    const fieldValue = form.state.values[fieldConfig.name];
    
    if (!fieldValue) {
      setUnitNumbers({});
      return;
    }

    // Convert object to array if needed
    const unitsArray = Array.isArray(fieldValue) 
      ? fieldValue 
      : Object.values(fieldValue);

    try {
      const newUnitNumbers = unitsArray.reduce((acc: Record<number, string>, unit: any, idx: number) => {
        acc[idx] = unit?.unitNumber || `Unit ${idx + 1}`;
        return acc;
      }, {});
      setUnitNumbers(newUnitNumbers);
    } catch (error) {
      console.error('Error processing units:', error);
      setUnitNumbers({});
    }
  }, [form.state.values, fieldConfig.name]);

  // Effect to handle total units changes
  useEffect(() => {
    if (totalUnits) {
      const numUnits = parseInt(totalUnits);
      const currentUnits = units.length;
      
      if (currentUnits < numUnits) {
        // Add new units
        const newUnits = [...units];
        for (let i = currentUnits; i < numUnits; i++) {
          newUnits.push({
            unitNumber: `Unit ${i + 1}`,
            bedrooms: 0,
            bathrooms: 0,
            toilets: 0,
            rooms: 0,
            offices: 0,
            area: {
              value: null,
              unit: 'SqM'
            },
            amenities: []
          });
        }
        fieldApi.handleChange(newUnits);
      } else if (currentUnits > numUnits) {
        // Remove excess units
        const newUnits = units.slice(0, numUnits);
        fieldApi.handleChange(newUnits);
        setExpanded(false);
      }
    }
  }, [totalUnits, units.length, fieldApi]);


  const handleRemove = (idx: number) => {
    if (units.length > 1) {
      const newUnits = units.filter((_: any, i: number) => i !== idx);
      fieldApi.handleChange(newUnits);
      setExpanded(false);
    }
  };

  const handleClone = (idx: number) => {
    if (units.length < (maxSubUnits || parseInt(totalUnits))) {
      const clone = { ...units[idx] };
      const newUnits = [
        ...units.slice(0, idx + 1),
        clone,
        ...units.slice(idx + 1)
      ];
      fieldApi.handleChange(newUnits);
      setExpanded(idx + 1);
    }
  };

  return (
    <Stack spacing={2}>
      {units.map((_, idx: number) => (
        <Accordion
          key={idx}
          expanded={expanded === idx}
          onChange={(_, isExpanded) => setExpanded(isExpanded ? idx : false)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {unitNumbers[idx] || `Unit ${idx + 1}`}
            </Typography>
            <Box ml="auto" display="flex" alignItems="center" gap={1}>
              {(!maxSubUnits || units.length < maxSubUnits) && (
                <IconButton
                  onClick={e => {
                    e.stopPropagation();
                    handleClone(idx);
                  }}
                  size="small"
                  aria-label="Clone unit"
                  disabled={units.length >= (maxSubUnits || parseInt(totalUnits))}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              )}
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  handleRemove(idx);
                }}
                size="small"
                aria-label="Remove unit"
                disabled={units.length === 2}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack 
              direction={isMobile ? 'column' : 'row'}
              justifyContent="space-between"
              flexWrap="wrap"
            >
              {(fieldConfig.fields || []).map((subField, subIdx) => {
                // Check showIf condition for subfield
                if (subField.showIf) {
                  const { values } = form.state;
                  if (!subField.showIf(values)) {
                    return null;
                  }
                }

                // Special handling for amenities field
                if (subField.name === 'amenities') {
                  return (
                    <form.Field
                      key={`${fieldConfig.name}[${idx}].${subField.name}-${subIdx}`}
                      name={`${fieldConfig.name}[${idx}].${subField.name}`}
                      validators={
                        subField.validation?.schema
                          ? {
                              onChange: ({ value }: { value: unknown }) => {
                                try {
                                  subField.validation?.schema?.parse(value);
                                  return undefined;
                                } catch (e: unknown) {
                                  if (e && typeof e === 'object' && 'errors' in e && Array.isArray((e as any).errors)) {
                                    return (e as any).errors?.[0]?.message || 'Invalid value';
                                  }
                                  return 'Invalid value';
                                }
                              }
                            }
                          : undefined
                      }
                    >
                      {(subFieldApi: FormFieldApi) => (
                        <Box sx={{ width: '100%' }}>
                          <KlubiqTSFormFields
                            field={subFieldApi}
                            form={form}
                            fieldConfig={{
                              ...subField,
                              customComponent: (f: FormFieldApi) => 
                                <AmenitiesDialog field={{ 
                                  fieldConfig: {
                                    ...subField,
                                    options: Array.isArray(subField.options)
                                      ? subField.options.map(opt => ({ ...opt, value: String(opt.value) }))
                                      : typeof subField.options === 'function'
                                        ? subField.options(form.state.values).map(opt => ({ ...opt, value: String(opt.value) }))
                                        : [],
                                  }, 
                                  state: f.state, 
                                  handleChange: f.handleChange,
                                }}
                                form={form}
                              /> 
                            }}
                          />
                        </Box>
                      )}
                    </form.Field>
                  );
                }

                // Special handling for unit number field
                if (subField.name === 'unitNumber') {
                  return (
                    <form.Field
                      key={`${fieldConfig.name}[${idx}].${subField.name}-${subIdx}`}
                      name={`${fieldConfig.name}[${idx}].${subField.name}`}
                      validators={
                        subField.validation?.schema
                          ? {
                              onChange: ({ value }: { value: unknown }) => {
                                try {
                                  subField.validation?.schema?.parse(value);
                                  return undefined;
                                } catch (e: unknown) {
                                  if (e && typeof e === 'object' && 'errors' in e && Array.isArray((e as any).errors)) {
                                    return (e as any).errors?.[0]?.message || 'Invalid value';
                                  }
                                  return 'Invalid value';
                                }
                              }
                            }
                          : undefined
                      }
                    >
                      {(subFieldApi: FormFieldApi) => (
                        <Box sx={{ width: '100%' }}>
                          <KlubiqTSFormFields
                            field={subFieldApi}
                            form={form}
                            fieldConfig={subField}
                          />
                        </Box>
                      )}
                    </form.Field>
                  );
                }

                // Regular fields layout
                return (
                  <form.Field
                    key={`${fieldConfig.name}[${idx}].${subField.name}-${subIdx}`}
                    name={`${fieldConfig.name}[${idx}].${subField.name}`}
                    validators={
                      subField.validation?.schema
                        ? {
                            onChange: ({ value }: { value: unknown }) => {
                              try {
                                subField.validation?.schema?.parse(value);
                                return undefined;
                              } catch (e: unknown) {
                                if (e && typeof e === 'object' && 'errors' in e && Array.isArray((e as any).errors)) {
                                  return (e as any).errors?.[0]?.message || 'Invalid value';
                                }
                                return 'Invalid value';
                              }
                            }
                          }
                        : undefined
                    }
                  >
                    {(subFieldApi: FormFieldApi) => (
                      <Box sx={{ 
                        width: isMobile ? '100%' : '48%',
                        flex: isMobile ? '1 1 100%' : '0 0 48%'
                      }}>
                        <KlubiqTSFormFields
                          field={subFieldApi}
                          form={form}
                          fieldConfig={subField}
                        />
                      </Box>
                    )}
                  </form.Field>
                );
              })}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
      {/* <Stack direction="row" justifyContent="end">
        <Button
          variant="klubiqMainButton"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          disabled={units.length >= parseInt(totalUnits)}
        >
          Add Unit
        </Button>
      </Stack> */}
    </Stack>
  );
};