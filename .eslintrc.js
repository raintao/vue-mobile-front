module.exports = {
    "extends": "google",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
            "arrowFunctions": true,
            "classes": true,
            "modules": true,
            "defaultParams": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "babel",
        // "html"
    ],
    "env": {
        "amd": true,
        "es6": true,
        "browser": true
    },
    "rules": {
        "quotes": [
            2,
            "single"
        ],
        "semi": [
            2,
            "always"
        ],
        "comma-dangle": [
            2, 
            "always"
        ],
        'indent': [
            1, 
            4, 
            { 
                'SwitchCase': 1
            }
        ],
        'brace-style': [
            2, 
            '1tbs', 
            { 
                'allowSingleLine': true
            }
        ],
        "comma-spacing": [
            2, 
            { 
                'before': true, 
                'after': true 
            }
        ],
        'array-bracket-spacing': [
            2, 
            'always'
        ],
        'computed-property-spacing': [
            2,
            'always'
        ]
    }
};
