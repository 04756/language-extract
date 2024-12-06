function Test() {

  const testFunction = () => {
    const a = "在方法里的文字"
    const b = "在定义b里的文字";
    return `在模板里的文字 ${a}`;
  }

  return (
    <div className='datasource-list'>
      真的没有包裹的文字
    </div>
  );
}

export default Test;
