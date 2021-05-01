if (window.MathJax && window.MathJax.Hub) {
    window.MathJax.Hub.Config({
        'TeX'         : {extensions: ['cancel.js', 'AMSmath.js', 'AMSsymbols.js', 'extpfeil.js']},
        'SVG'         : {
            extensions      : ['handle-floats.js'],
            undefinedFamily : "bkoodak, Arial,'Times New Roman',STIXGeneral,'Arial Unicode MS',serif",
            mtextFontInherit: true,
            noReflows       : false,
            scale           : 100,
            linebreaks      : {automatic: true},
        },
        'HTML-CSS'    :
            {
                extensions      : ['handle-floats.js'],
                undefinedFamily : "bkoodak, Arial,'Times New Roman',STIXGeneral,'Arial Unicode MS',serif",
                mtextFontInherit: true,
                noReflows       : false,
                scale           : 100,
                linebreaks      : {automatic: true},
            },
        'CommonHTML'  :
            {
                extensions      : ['handle-floats.js'],
                undefinedFamily : "bkoodak, Arial,'Times New Roman',STIXGeneral,'Arial Unicode MS',serif",
                mtextFontInherit: true,
                noReflows       : false,
                scale           : 100,
                linebreaks      : {automatic: true},
            },
        tex2jax       : {
            preview   : ['[فرمول]'],
            inlineMath: [['$', '$'], ['\\(', '\\)']]
        },
        processEscapes: true,
        menuSettings  : {zoom: 'Double-Click', mpContext: true, mpMouse: true}
    });
    window.MathJax.Hub.Register.StartupHook('HTML-CSS Jax Ready', function () {
        var REMAP = MathJax.OutputJax['HTML-CSS'].FONTDATA.REMAP;
        var ZERO = 0x6F0;
        for (var i = 0; i < 10; i++) {
            REMAP[0x30 + i] = ZERO + i
        }
        REMAP[0x2E] = 0x066B;
    });
    window.MathJax.Hub.Register.StartupHook('SVG Jax Ready', function () {
        var REMAP = MathJax.OutputJax['SVG'].FONTDATA.REMAP;
        var ZERO = 0x6F0;
        for (var i = 0; i < 10; i++) {
            REMAP[0x30 + i] = ZERO + i
        }
        REMAP[0x2E] = 0x066B;
    });
}
// if (window.MathJax) {
//     window.MathJax = {
//         tex2jax: {
//             inlineMath: [ ['$','$'], ["\\(","\\)"] ],
//             processEscapes: true
//         }
//     };
// }
