import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface FormContextType {
    tokenMint: string;
    associatedAccountOwner: string;
    recipient: string;
    tokenAmount: number;
    setTokenMint: (newValue: string) => void;
    setAssociatedAccountOwner: (newValue: string) => void;
    setRecipient: (newValue: string) => void;
    setTokenAmount: (newValue: number) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const FormProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [tokenMint, setTokenMint] = useState<string>('');
    const [associatedAccountOwner, setAssociatedAccountOwner] = useState<string>('');
    const [recipient, setRecipient] = useState<string>('');
    const [tokenAmount, setTokenAmount] = useState<number>(0);

    const contextValue = {
        tokenMint,
        associatedAccountOwner,
        recipient,
        tokenAmount,
        setTokenMint,
        setAssociatedAccountOwner,
        setRecipient,
        setTokenAmount,
    };

    return (
        <FormContext.Provider value={contextValue}>
            {children}
        </FormContext.Provider>
    );
};

const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext must be used')
    }
    return context
};

export { FormProvider, useFormContext }