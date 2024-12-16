function Test() {

  const testFunction = () => {
    const a = t("在方法里的文字");
    const b = t("在定义b里的文字");;
    return `在模板里的文字 ${a}`;
  }

  return (
    <div className='datasource-list'>{
        t("\n      真的没有包裹的文字\n    ")
      }</div>
  );
}

export default Test;
