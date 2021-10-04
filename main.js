function main() {
    // Access the canvas through DOM: Document Object Model
    var canvas = document.getElementById('myCanvas');   // The paper
    var gl = canvas.getContext('webgl');                // The brush and the paints

    var vertices = [
        //Background Right
        0.05507,0.35131, 0.1, 0.1, 0.1, 
        0.07736,-0.07955, 0.1, 0.1, 0.1, 
        0.79049,-0.07955, 0.1, 0.1, 0.1,
        0.79049,-0.07955, 0.1, 0.1, 0.1,
        0.81278,0.35131, 0.1, 0.1, 0.1,
        0.05507,0.35131, 0.1, 0.1, 0.1, 

        //3D Right
        0.0755,0.37731, 0.2, 0.2, 0.2, //I
        0.05507,0.35131, 0.2, 0.2, 0.2, //J
        0.81278,0.35131, 0.2, 0.2, 0.2, //K 
        0.81278,0.35131, 0.2, 0.2, 0.2, //K
        0.78864,0.37731, 0.2, 0.2, 0.2, //L
        0.0755,0.37731, 0.2, 0.2, 0.2, //I

        //Screen Right
        0.11076,0.32463,0.3, 0.3, 0.3,
        0.1304,-0.05066,0.3, 0.3, 0.3,
        0.72575,-0.04476,0.3, 0.3, 0.3,
        0.72575,-0.04476,0.3, 0.3, 0.3,
        0.73754,0.32463,0.3, 0.3, 0.3,
        0.11076,0.32463,0.3, 0.3, 0.3,

        //Button Right
        0.583,0.38178,0.18, 0.18, 0.18,
        0.61595,0.38467, 0.18, 0.18, 0.18, //Center
        0.57382,0.37661, 0.18, 0.18, 0.18, 
        0.57382,0.37661, 0.18, 0.18, 0.18, 
        0.61595,0.38467, 0.18, 0.18, 0.18, //Center
        0.58869,0.3698, 0.18, 0.18, 0.18,
        0.58869,0.3698, 0.18, 0.18, 0.18,  
        0.61595,0.38467, 0.18, 0.18, 0.18, //Center
        0.6017,0.36732, 0.18, 0.18, 0.18,
        0.6017,0.36732, 0.18, 0.18, 0.18,
        0.61595,0.38467, 0.18, 0.18, 0.18, //Center
        0.61409,0.36546, 0.18, 0.18, 0.18, 
        0.61409,0.36546, 0.18, 0.18, 0.18, 
        0.61595,0.38467, 0.18, 0.18, 0.18, //Center
        0.62525,0.36546, 0.18, 0.18, 0.18,
        0.62525,0.36546, 0.18, 0.18, 0.18,
        0.61595,0.38467, 0.18, 0.18, 0.18, //Center
        0.63764,0.3667, 0.18, 0.18, 0.18,
        0.63764,0.3667, 0.18, 0.18, 0.18,  
        0.61595,0.38467, 0.18, 0.18, 0.18, //Center
        0.65018,0.37002, 0.18, 0.18, 0.18,
        0.65018,0.37002, 0.18, 0.18, 0.18,
        0.61595,0.38467, 0.18, 0.18, 0.18, //Center
        0.65834,0.37376, 0.18, 0.18, 0.18,
        0.65834,0.37376, 0.18, 0.18, 0.18, 
        0.61595,0.38467, 0.18, 0.18, 0.18, //Center
        0.66,0.38, 0.18, 0.18, 0.18,
    

        //Background Left
        -0.92782,0.32622, 0.1, 0.1, 0.1, //C
        -0.86509,-0.0953, 0.1, 0.1, 0.1, //D
        -0.10736,-0.09028, 0.1, 0.1, 0.1, //E
        -0.10736,-0.09028, 0.1, 0.1, 0.1, //E
        -0.07725,0.33877, 0.1, 0.1, 0.1, //F
        -0.92782,0.32622, 0.1, 0.1, 0.1, //C

        //3D Left
        -0.89269,0.36637, 0.2, 0.2, 0.2, //G
        -0.92782,0.32622, 0.2, 0.2, 0.2, //C
        -0.07725,0.33877, 0.2, 0.2, 0.2, //F
        -0.07725,0.33877, 0.2, 0.2, 0.2, //F
        -0.10234,0.37891, 0.2, 0.2, 0.2, //H
        -0.89269,0.36637, 0.2, 0.2, 0.2, //G

    ];

    // Create a linked-list for storing the vertices data
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vertexShaderSource = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uChange;
        void main() {
            gl_Position = vec4(aPosition + uChange, 0.0, 1.0);
            vColor = aColor;
        }
    `;

    var fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

    // Create .c in GPU
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    // Compile .c into .o
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    // Prepare a .exe shell (shader program)
    var shaderProgram = gl.createProgram();

    // Put the two .o files into the shell
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    // Link the two .o files, so together they can be a runnable program/context.
    gl.linkProgram(shaderProgram);

    // Start using the context (analogy: start using the paints and the brushes)
    gl.useProgram(shaderProgram);

    // Teach the computer how to collect
    //  the positional values from ARRAY_BUFFER
    //  to each vertex being processed
    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(
        aPosition, 
        2, 
        gl.FLOAT, 
        false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        0
    );
    gl.enableVertexAttribArray(aPosition);
    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(
        aColor,
        3,
        gl.FLOAT,
        false, 
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aColor);

    // Interactive graphics with mouse
    var freeze = false;
    function onMouseClick(event) {
        freeze = !freeze;
    }
    document.addEventListener("click", onMouseClick);
    // Interactive graphics with keyboard
    function onKeydown(event) {
        if (event.keyCode == 32)
        {
            freeze = true;
        }
    }
    function onKeyup(event)
    {
        if(event.keyCode == 32)
        {
            freeze = false;
        }
    }
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("keyup", onKeyup);
    var speedRaw = 1;
    var speed = speedRaw / 600;
    var change = 0;
    var uChange = gl.getUniformLocation(shaderProgram, "uChange");
    function render() {
        if (!freeze) {  // If it is not freezing, then animate the rectangle
            if (change >= 0.5 || change <= -0.5) speed = -speed;
            change = change + speed;
            gl.uniform1f(uChange, change);
        }
        gl.clearColor(0.0, 0.0, 0.0, 0.2);
        gl.clear(gl.COLOR_BUFFER_BIT);
        var primitive = gl.TRIANGLES;
        var offset = 0;
        var nVertex = vertices.length;
        gl.drawArrays(primitive, offset, nVertex);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}