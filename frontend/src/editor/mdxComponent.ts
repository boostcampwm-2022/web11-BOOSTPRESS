//설정할 mdx문법
const mdxComponents = `
export const Highlight = ({children, color}) => (
    <span
      style={{
        backgroundColor: color,
        borderRadius: '2px',
        color: '#fff',
        padding: '0.2rem',
      }}
      
      >
      {children}
    </span>
  );


export const Code = ({children}) => (
  <div className="code-accordion">{children}</div>
)

export const Description = ({children}) => {
  
  return (
  <div style ={{position : 'relative'}}>
    <div
      className='accordion_btn'
      onClick={(e)=>{
        e.target.innerText = e.target.innerText ==='+'?'‒':'+';
        e.target.nextSibling.style.display = e.target.nextSibling.style.display=== 'none' ? 'block': 'none'
      }}      
      style={{
        position : 'absolute', 
        color : '#fff',
        top : '-2.4rem',
        right : '0.7rem',
        fontSize : '1.5rem',
        cursor : 'pointer',
        margin : '0',
      }}>-</div>
    <p>
      <p>&nbsp;</p>
      <div>{children}</div>
    </p>
  </div>
)}

`;

export default mdxComponents;
