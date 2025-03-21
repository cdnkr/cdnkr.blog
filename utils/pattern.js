const patterns = [
    // "pattern-checks-sm",
    // "pattern-checks-md",
    // "pattern-checks-lg",
    // "pattern-checks-xl",
    // "pattern-grid-sm",
    // "pattern-grid-md",
    // "pattern-grid-lg",
    // "pattern-grid-xl",
    // "pattern-dots-sm",
    // "pattern-dots-md",
    // "pattern-dots-lg",
    // "pattern-dots-xl",
    // "pattern-cross-dots-sm",
    // "pattern-cross-dots-md",
    // "pattern-cross-dots-lg",
    // "pattern-cross-dots-xl",
    // "pattern-vertical-lines-sm",
    // "pattern-vertical-lines-md",
    // "pattern-vertical-lines-lg",
    // "pattern-vertical-lines-xl",
    // "pattern-horizontal-lines-sm",
    // "pattern-horizontal-lines-md",
    // "pattern-horizontal-lines-lg",
    // "pattern-horizontal-lines-xl",
    "pattern-diagonal-lines-sm",
    "pattern-diagonal-lines-md",
    "pattern-diagonal-lines-lg",
    "pattern-diagonal-lines-xl",
    // "pattern-vertical-stripes-sm",
    // "pattern-vertical-stripes-md",
    // "pattern-vertical-stripes-lg",
    // "pattern-vertical-stripes-xl",
    // "pattern-horizontal-stripes-sm",
    // "pattern-horizontal-stripes-md",
    // "pattern-horizontal-stripes-lg",
    // "pattern-horizontal-stripes-xl",
    "pattern-diagonal-stripes-sm",
    "pattern-diagonal-stripes-md",
    "pattern-diagonal-stripes-lg",
    "pattern-diagonal-stripes-xl",
    "pattern-zigzag-sm",
    "pattern-zigzag-md",
    "pattern-zigzag-lg",
    "pattern-zigzag-xl",
    // "pattern-triangles-sm",
    // "pattern-triangles-md",
    // "pattern-triangles-lg",
    // "pattern-triangles-xl",
    "pattern-isometric",
    "pattern-isometric-lg",
    "pattern-cross",
    "pattern-gottagetthatpaper",
    "pattern-zigzag-3d",
    // "pattern-triangle",
    "pattern-moon",
]

// helper function to get the base style name from a pattern
const getBaseStyle = (pattern) => {
    // Extract the base style by removing the size suffix (-sm, -md, -lg, -xl)
    return pattern.replace(/-(?:sm|md|lg|xl|3d)$/, '');
};

// shuffle patterns while ensuring no consecutive patterns have the same base style
const shufflePatterns = () => {
    // First, do a basic shuffle
    const shuffled = [...patterns].sort(() => Math.random() - 0.5);
    
    // then ensure no consecutive patterns have the same base style
    for (let i = 1; i < shuffled.length; i++) {
        const prevBaseStyle = getBaseStyle(shuffled[i-1]);
        const currentBaseStyle = getBaseStyle(shuffled[i]);
        
        // if current pattern has the same base style as previous one
        if (prevBaseStyle === currentBaseStyle) {
            // find a pattern with a different base style to swap with
            let swapIndex = -1;
            for (let j = i + 1; j < shuffled.length; j++) {
                if (getBaseStyle(shuffled[j]) !== prevBaseStyle) {
                    swapIndex = j;
                    break;
                }
            }
            
            // if no suitable pattern found after current position, look before
            if (swapIndex === -1) {
                for (let j = 0; j < i - 1; j++) {
                    if (getBaseStyle(shuffled[j]) !== prevBaseStyle && 
                        (j === 0 || getBaseStyle(shuffled[j-1]) !== currentBaseStyle)) {
                        swapIndex = j;
                        break;
                    }
                }
            }
            
            // swap if a suitable position was found
            if (swapIndex !== -1) {
                [shuffled[i], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[i]];
            }
        }
    }
    
    return shuffled;
};

const shuffled = shufflePatterns();

const getPattern = (index) => {
    return shuffled[index % shuffled.length];
}

export default getPattern;
