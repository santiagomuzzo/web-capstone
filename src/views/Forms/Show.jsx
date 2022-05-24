import * as React from "react";
import ShowEdit from "../../components/ShowEdit";

function FormShow() {
  const id = window.location.pathname.split("/")[2];
  return (
    <div>
      <ShowEdit data={id} />
    </div>
  );
}

export default FormShow;