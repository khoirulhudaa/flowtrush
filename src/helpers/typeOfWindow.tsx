const WindowDependentComponent = () => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 0;
   
    return <div>Window width: {width}</div>;
};
   
export default WindowDependentComponent;