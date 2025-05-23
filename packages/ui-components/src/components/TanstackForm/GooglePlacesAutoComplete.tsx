import { TextField, Autocomplete } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GooglePlacesAutocompleteProps {
  apiKey: string;
  value: any;
  onChange: (value: any) => void;
  onBlur: () => void;
  error?: boolean;
  helperText?: string;
  country?: string;
  types?: string[];
}

export const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({
  apiKey,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  country,
  types = ['address'],
  ...props
}) => {
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [inputValue, setInputValue] = useState('');
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then(() => {
      autocompleteService.current = new google.maps.places.AutocompleteService();
      if (inputRef.current) {
        placesService.current = new google.maps.places.PlacesService(inputRef.current);
      }
    });
  }, [apiKey]);

  const handleInputChange = async (newValue: string) => {
    setInputValue(newValue);
    
    if (!newValue || !autocompleteService.current) return;

    try {
      const request: google.maps.places.AutocompletionRequest = {
        input: newValue,
        types,
        componentRestrictions: country ? { country } : undefined
      };

      const response = await autocompleteService.current.getPlacePredictions(request);
      setPredictions(response.predictions);
    } catch (error) {
      console.error('Error fetching predictions:', error);
      setPredictions([]);
    }
  };

  const handlePlaceSelect = async (placeId: string) => {
    if (!placesService.current) return;

    try {
      const place = await new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
        placesService.current?.getDetails(
          { placeId, fields: ['formatted_address', 'geometry'] },
          (result, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && result) {
              resolve(result);
            } else {
              reject(new Error('Place details not found'));
            }
          }
        );
      });

      onChange(place);
      setInputValue(place.formatted_address || '');
      setPredictions([]);
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={predictions}
      getOptionLabel={(option) => 
        typeof option === 'string' ? option : option.description
      }
      inputValue={inputValue}
      onInputChange={(_, newValue) => handleInputChange(newValue)}
      onChange={(_, newValue) => {
        if (typeof newValue === 'string') {
          onChange({ formatted_address: newValue });
        } else if (newValue) {
          handlePlaceSelect(newValue.place_id);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          error={error}
          helperText={helperText}
          onBlur={onBlur}
          inputRef={inputRef}
          {...props}
        />
      )}
    />
  );
};