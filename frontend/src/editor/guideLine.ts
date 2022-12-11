const guideLine = {
    testguide: `
## mdx 에디터!

<Highlight color="#25c2a0">초록하이라이트</Highlight> 그리고 <Highlight color="#1877F2">파란하이라이트</Highlight> 를 사용해보세요

**마크다운을** JSX로 사용이 가능합니다

<Code>    
    ${'```js'}
        console.log('코드를 입력해보세요!');
    ${'```'}
    <Description>
    ### 설명을 입력해 보세요!
    > 마크다운 문법으로 입력해보세요
    >> 아코디언처럼 설명추가가 가능합니다.
    </Description>
    ${'```js'}
        //코드를 입력해 보세요!
    ${'```'}
    <Description>
    설명을 입력해 보세요!
    </Description>
</Code>
`,
};

export default guideLine;
