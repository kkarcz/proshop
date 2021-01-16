import React, {memo} from 'react';
import { Alert } from "react-bootstrap";

interface MessageProps {
    variant?: string;
    children: string
}

const Message = ({ variant = 'info', children }: MessageProps) => {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    );
};

export default memo(Message);