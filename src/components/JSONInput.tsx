/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import {
  type ColumnData,
  type ColumnType,
  possibleObjectTypes,
} from "~/types/database.types";
import { removeItemAtIndex } from "~/utils/removeItemAtIndex";

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
        <li
          className="flex justify-between gap-2 pb-2"
          key={`${index}-${item}`}
        >
          <JSONInput
            defaultValue={item}
            onChange={(newValue) => handleOnChange(index, newValue as string)}
          />
          <button
            className="btn-error"
            onClick={() => handleOnChange(index, null)}
          >
            Remove
          </button>
        </li>
      ))}
      <li className="flex justify-end">
        <button
          className="btn-secondary"
          onClick={() => handleOnChange(value.length, "")}
        >
          +
        </button>
      </li>
    </ul>
  );
};

type ObjectPropertyProps = {
  propertyName: string;
  defaultType: string;
  defaultValue: string;
  handleOnChangeType: (key: string, newValue: string | null) => void;
  handleOnChangeDefaultValue: (key: string, newValue: string | null) => void;
};

const ObjectProperty: React.FC<ObjectPropertyProps> = ({
  propertyName,
  defaultType,
  defaultValue,
  handleOnChangeType,
  handleOnChangeDefaultValue,
}) => {
  const [type, setType] = useState(defaultType ?? "");
  const [value, setValue] = useState(defaultValue ?? "");
  return (
    <li className="flex w-64 justify-between gap-2 bg-slate-300 p-1">
      <span>{propertyName}: </span>
      <select
        value={type}
        onChange={(e) => {
          setType(e.target.value);
          handleOnChangeType(propertyName, e.target.value);
        }}
      >
        {possibleObjectTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          setValue(newValue);
          handleOnChangeDefaultValue(propertyName, newValue);
        }}
        className="w-full"
        placeholder="Default Value"
      />
      <button
        className="btn-error"
        onClick={() => handleOnChangeType(propertyName, null)}
      >
        x
      </button>
    </li>
  );
};

interface ObjectInputProps {
  defaultValue: Record<string, { type: ColumnType; default_values?: string[] }>;
  onChange: (newValue: any) => void;
}

export const ObjectInput: React.FC<ObjectInputProps> = ({
  defaultValue,
  onChange,
}) => {
  const [value, setValue] = useState(defaultValue ?? {});
  const handleOnChangeType = (key: string, newValue: string | null) => {
    const newObj = { ...value };
    if (newValue === null) {
      delete newObj[key];
    } else {
      newObj[key] = {
        ...newObj[key],
        type: newValue as ColumnType,
      } as ColumnData;
    }
    setValue(newObj);
    onChange(newObj);
  };
  const handleOnChangeDefaultValue = (key: string, newValue: string | null) => {
    const newObj = { ...value };
    if (newValue === null) {
      delete newObj[key];
    } else {
      newObj[key] = {
        ...newObj[key],
        default_values: [newValue],
      } as ColumnData;
    }
    setValue(newObj);
    onChange(newObj);
  };
  const [newKey, setNewKey] = useState("");
  return (
    <ul>
      {Object.keys(defaultValue).map((key, index) => (
        <ObjectProperty
          key={`${index}-${key}`}
          propertyName={key}
          defaultType={defaultValue[key]?.type ?? "string"}
          defaultValue={defaultValue[key]?.default_values?.[0] ?? ""}
          handleOnChangeType={handleOnChangeType}
          handleOnChangeDefaultValue={handleOnChangeDefaultValue}
        />
      ))}
      <li className="flex justify-end gap-2">
        <input
          type="text"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          className="w-full"
          placeholder="New Key"
        />
        <button
          className="btn-secondary"
          onClick={() => {
            handleOnChangeType(newKey, "string");
            setNewKey("");
          }}
          disabled={!newKey}
        >
          +
        </button>
      </li>
    </ul>
  );
};

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
