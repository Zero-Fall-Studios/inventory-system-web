/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
interface StringInputProps {
  value: string;
  onChange: (newValue: string) => void;
}

export const StringInput: React.FC<StringInputProps> = ({
  value,
  onChange,
}) => (
  <input
    type="text"
    value={value}
    onChange={(event) => onChange(event.target.value)}
    className="w-full"
  />
);

interface NumberInputProps {
  value: number;
  onChange: (newValue: number) => void;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
}) => (
  <input
    type="number"
    value={value}
    onChange={(event) => onChange(Number(event.target.value))}
    className="w-full"
  />
);

interface BooleanInputProps {
  value: boolean;
  onChange: (newValue: boolean) => void;
}

export const BooleanInput: React.FC<BooleanInputProps> = ({
  value,
  onChange,
}) => (
  <select
    value={value.toString()}
    onChange={(event) => onChange(event.target.value === "true")}
    className="w-full"
  >
    <option value="true">true</option>
    <option value="false">false</option>
  </select>
);

const NullInput: React.FC = () => <span>null</span>;

interface ArrayInputProps {
  value: any[];
  onChange: (index: number, newValue: any) => void;
}

export const ArrayInput: React.FC<ArrayInputProps> = ({ value, onChange }) => (
  <ul>
    {value.map((item, index) => (
      <li key={index}>
        <JSONInput
          value={item}
          onChange={(newValue) => onChange(index, newValue)}
        />
        <button onClick={() => onChange(index, null)}>Remove</button>
      </li>
    ))}
    <li>
      <button onClick={() => onChange(value.length, "")}>Add Item</button>
    </li>
  </ul>
);

interface ObjectInputProps {
  value: Record<string, any>;
  onChange: (key: string, newValue: any) => void;
}

export const ObjectInput: React.FC<ObjectInputProps> = ({
  value,
  onChange,
}) => (
  <ul>
    {Object.keys(value).map((key) => (
      <li key={key}>
        <span>{key}: </span>
        <JSONInput
          value={value[key]}
          onChange={(newValue) => onChange(key, newValue)}
        />
        <button onClick={() => onChange(key, null)}>Remove</button>
      </li>
    ))}
    <li>
      <button onClick={() => onChange("", "")}>Add Property</button>
    </li>
  </ul>
);

interface JSONInputProps {
  value: any;
  onChange: (newValue: any) => void;
}

export const JSONInput: React.FC<JSONInputProps> = ({ value, onChange }) => {
  if (typeof value === "string") {
    return <StringInput value={value} onChange={onChange} />;
  }
  if (typeof value === "number") {
    return <NumberInput value={value} onChange={onChange} />;
  }
  if (typeof value === "boolean") {
    return <BooleanInput value={value} onChange={onChange} />;
  }
  if (value === null) {
    return <NullInput />;
  }
  if (Array.isArray(value)) {
    return <ArrayInput value={value} onChange={onChange} />;
  }
  if (typeof value === "object") {
    return <ObjectInput value={value} onChange={onChange} />;
  }

  return null;
};
