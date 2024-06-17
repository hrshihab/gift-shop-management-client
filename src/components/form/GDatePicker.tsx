import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type GHInputDatePickerProps = {
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
};

const GDatePicker = ({
    name,
    label,
    placeholder,
    disabled,
}: GHInputDatePickerProps) => {
    return (
        <div style={{ marginBottom: "10px" }}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label} style={{ margin: "0px" }}>
                        <DatePicker
                            {...field}
                            id={name}
                            placeholder={placeholder}
                            style={{ width: "100%" }}
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

export default GDatePicker;
