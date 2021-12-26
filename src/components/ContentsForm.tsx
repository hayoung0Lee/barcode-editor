import styles from "../css/ContentsForm.module.css";

const ContentsForm = () => {
  return (
    <h2>
      <input defaultValue={`{{name}}`}></input>
      <input defaultValue={`{{원하는 속성값을 입력하세요}}`}></input>
      <button>Apply</button>
    </h2>
  );
};

export default ContentsForm;
