/// <reference types="react-scripts" />
interface IProps {
    selectedCountry: string | null;
    setSelectedCountry: (country: string | null) => void;
}
