import React, {memo} from 'react';
import { Alert } from "react-bootstrap";

interface IMessageProps {
    variant?: string;
    children: React.ReactNode;
}

const Message = ({ variant = 'info', children }: IMessageProps) => {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    );
};

export default memo(Message);