uniform sampler2D uTexture;
uniform float uDistance;

varying vec2 vUv;

vec3 getLuminance(vec3 color) {
    vec3 luminance = vec3(0.2, 0.75, 0.1) / 2.;
    return vec3(dot(luminance, color));
}

vec3 alteredColors(vec3 inputColor) {
    const mat3 Mat = mat3(0.5, 0.5, 0.1, 0.5, 0.1, 0.1, 0.1, 0.5, 0.1);

    return inputColor * Mat;
}

float roundedBoxSDF(vec2 CenterPosition, vec2 Size, float Radius) {
    vec2 q = abs(CenterPosition) - Size + Radius;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - Radius;
}

void main() {
    vec4 image = texture(uTexture, vUv);
    float distanceFactor = min(max(uDistance, 0.), 1.);

    vec3 imageLum = getLuminance(image.xyz);
    vec3 texColor = alteredColors(image.xyz);
    vec3 color = mix(texColor, imageLum, distanceFactor);

    // Rounded corners logic
    vec2 boxCenter = vec2(0.5); // Center of the box in UV space
    vec2 boxSize = vec2(0.4);   // Size of the box (width and height)
    float cornerRadius = 0.1;   // Radius of the rounded corners
    float edgeSoftness = 0.001;  // Softness of the edges

    float distance = roundedBoxSDF(vUv - boxCenter, boxSize, cornerRadius);
    float smoothedAlpha = 1.0 - smoothstep(0.0, edgeSoftness, distance);

    vec4 finalColor = vec4(color, smoothedAlpha * image.a);

    gl_FragColor = finalColor;
}