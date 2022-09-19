
function DollarCellRenderer(props: any) {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  return (
    <span className="text-muted">
      {cellValue ? (
        <>
          {" "}
          $&nbsp;<span>{cellValue}</span>
        </>
      ) : null}
    </span>
  );
}

export default DollarCellRenderer;
