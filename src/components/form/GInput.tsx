import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TGInputProps = {
    type: string;
    name: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
};

const GInput = ({ type, name, placeholder, label, disabled }: TGInputProps) => {
    return (
        <div style={{ marginBottom: `${label && "10px"}` }}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label} style={{ margin: "0px" }}>
                        <Input
                            {...field}
                            type={type}
                            id={name}
                            placeholder={placeholder}
                            disabled={disabled}
                        />
                        {error && (
                            <small style={{ color: "red" }}>
                                {error.message}
                            </small>
                        )}
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default GInput;
