//설정할 mdx문법
const mdxComponents = `
export const planet = 'World'
export const Highlight = ({children, color}) => (
    <span
      style={{
        backgroundColor: color,
        borderRadius: '2px',
        color: '#fff',
        padding: '0.2rem',
      }}>
      {children}
    </span>
  );

`;

export default mdxComponents;
