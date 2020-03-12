import React, {
  Children,
  useState,
  forwardRef,
  cloneElement,
  useEffect
} from "react";
import { Input } from "antd";
import classNames from "classnames";
import "./input.scss";

const WrappedInput = ({ ref, props, children }) => {
  const { value = "", onChange, placeholder, prefix, ...restProps } = props;
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    value ? setIsChanged(true) : setIsChanged(false);
  }, [value]);

  const handleInputOnchange = e => {
    if (onChange) onChange(e);
  };

  const classInput = classNames("input-advance__content--input", {
    "input-advance__content--input-change": isChanged
  });
  const classLabel = classNames(
    "input-advance__content--label",
    {
      "input-advance__content--label-prefix": !!prefix
    },
    {
      "input-advance__content--label-change": isChanged
    }
  );

  // pass props to chidren component
  const _children = Children.map(children, child =>
    cloneElement(child, {
      ...restProps,
      prefix,
      className: classInput,
      value,
      onChange: handleInputOnchange,
      ref
    })
  );

  return (
    <div className="input-advance">
      <label className="input-advance__content">
        <div className={classLabel}>
          <span>{placeholder}</span>
        </div>
        {_children}
      </label>
    </div>
  );
};

const InputAdvance = forwardRef((props, ref) => (
  <WrappedInput props={props} ref={ref}>
    <Input />
  </WrappedInput>
));

const PasswordAdvance = forwardRef((props, ref) => (
  <WrappedInput props={props} ref={ref}>
    <Input.Password />
  </WrappedInput>
));

export { InputAdvance, PasswordAdvance };
