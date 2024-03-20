import Select, { components } from "react-select";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";

function arrayMove(array, from, to) {
  const slicedArray = array.slice();
  slicedArray.splice(
    to < 0 ? array.length + to : to,
    0,
    slicedArray.splice(from, 1)[0]
  );
  return slicedArray;
}

const SortableMultiValue = SortableElement((props) => {
  const onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const innerProps = { ...props.innerProps, onMouseDown };
  return (
    <components.MultiValue
      // className="!bg-red-600"
      {...props}
      innerProps={innerProps}
    />
  );
});

const SortableMultiValueLabel = SortableHandle((props) => (
  <components.MultiValueLabel
    //  className="!bg-red-600"
    {...props}
  />
));

const SortableSelect = SortableContainer(Select);

// Main Component
export default function InputDrag({ options, selected, setSelected }) {
  const onChange = (selectedOptions) => setSelected(selectedOptions);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newValue = arrayMove(selected, oldIndex, newIndex);
    setSelected(newValue);
  };

  return (
    <div className="-z-50">
      <SortableSelect
        // className="text-blue-800"
        useDragHandle
        axis="xy"
        onSortEnd={onSortEnd}
        distance={4}
        getHelperDimensions={({ node }) => node.getBoundingClientRect()}
        isMulti
        options={options}
        value={selected}
        onChange={onChange}
        components={{
          MultiValue: SortableMultiValue,
          MultiValueLabel: SortableMultiValueLabel,
        }}
        closeMenuOnSelect={false}
      />
    </div>
  );
}
