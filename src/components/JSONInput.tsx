/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";

interface StringInputProps {
  defaultValue: string;
  onChange: (newValue: string) => void;
}

export const StringInput: React.FC<StringInputProps> = ({
  defaultValue,
  onChange,
}) => {
  const [value, setValue] = useState<string>(defaultValue ?? "");
  const handleOnChange = (event: any) => {
    const newValue = event.target.value as string;
    onChange(newValue);
    setValue(newValue);
  };
  return (
    <input
      type="text"
      value={value}
      onChange={handleOnChange}
      className="w-full"
    />
  );
};

interface NumberInputProps {
  defaultValue: number;
  onChange: (newValue: number) => void;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  defaultValue,
  onChange,
}) => {
  const [value, setValue] = useState<number>(defaultValue ?? 0);
  const handleOnChange = (event: any) => {
    const newValue = Number(event.target.value);
    onChange(newValue);
    setValue(newValue);
  };
  return (
    <input
      type="number"
      value={value}
      onChange={handleOnChange}
      className="w-full"
    />
  );
};

interface BooleanInputProps {
  defaultValue: boolean;
  onChange: (newValue: boolean) => void;
}

export const BooleanInput: React.FC<BooleanInputProps> = ({
  defaultValue,
  onChange,
}) => {
  const [value, setValue] = useState<boolean>(defaultValue ?? false);
  const handleOnChange = (event: any) => {
    const newValue = Boolean(event.target.value);
    onChange(newValue);
    setValue(newValue);
  };
  return (
    <select
      value={value.toString()}
      onChange={handleOnChange}
      className="w-full"
    >
      <option value="true">true</option>
      <option value="false">false</option>
    </select>
  );
};

const NullInput: React.FC = () => <span>null</span>;

function removeItemAtIndex(arr: string[], index: number) {
  if (index < 0 || index >= arr.length) {
    return [];
  }
  arr.splice(index, 1);
  return arr;
}

interface ArrayInputProps {
  defaultValue: string[];
  onChange: (newValue: string[]) => void;
}

export const ArrayInput: React.FC<ArrayInputProps> = ({
  defaultValue,
  onChange,
}) => {
  const [value, setValue] = useState<string[]>(defaultValue ?? []);
  const handleOnChange = (index: number, newValue: string | null) => {
    let newArray = [...value];
    if (newValue === null) {
      newArray = removeItemAtIndex(newArray, index);
    } else {
      newArray[index] = newValue;
    }
    setValue(newArray);
    onChange(newArray);
  };
  return (
    <ul>
      {value.map((item, index) => (
        <li className="flex justify-between" key={`${index}-${item}`}>
          <JSONInput
            defaultValue={item}
            onChange={(newValue) => handleOnChange(index, newValue as string)}
          />
          <button
            className="btn-primary"
            onClick={() => handleOnChange(index, null)}
          >
            Remove
          </button>
        </li>
      ))}
      <li>
        <button
          className="btn-primary"
          onClick={() => handleOnChange(value.length, "")}
        >
          Add
        </button>
      </li>
    </ul>
  );
};

interface ObjectInputProps {
  defaultValue: Record<string, any>;
  onChange: (key: any, newValue: any) => void;
}

export const ObjectInput: React.FC<ObjectInputProps> = ({
  defaultValue,
  onChange,
}) => (
  <ul>
    {Object.keys(defaultValue).map((key) => (
      <li key={key}>
        <span>{key}: </span>
        <JSONInput
          defaultValue={defaultValue[key]}
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
  defaultValue: any;
  onChange: (newValue: any) => void;
}

export const JSONInput: React.FC<JSONInputProps> = ({
  defaultValue,
  onChange,
}) => {
  if (typeof defaultValue === "string") {
    return <StringInput defaultValue={defaultValue} onChange={onChange} />;
  }
  if (typeof defaultValue === "number") {
    return <NumberInput defaultValue={defaultValue} onChange={onChange} />;
  }
  if (typeof defaultValue === "boolean") {
    return <BooleanInput defaultValue={defaultValue} onChange={onChange} />;
  }
  if (defaultValue === null) {
    return <NullInput />;
  }
  if (Array.isArray(defaultValue)) {
    return <ArrayInput defaultValue={defaultValue} onChange={onChange} />;
  }
  if (typeof defaultValue === "object") {
    return <ObjectInput defaultValue={defaultValue} onChange={onChange} />;
  }

  return null;
};
