/** Mesh gradient shader from Figma Halva card — node 698:29995 */
// @ts-nocheck

function defineProperties(_component: unknown, _properties: unknown): void {}

export default function Effect() {}

export function setup(device, frame) {
  const meshShader = `
diagnostic(off,derivative_uniformity);
struct Uniforms { values: array<vec4f, 32>, };
@group(0) @binding(0) var<uniform> uniforms: Uniforms;
struct VertexInput { @location(0) parameter: vec2f, };
struct VertexOutput { @builtin(position) position: vec4f, @location(0) color: vec4f, };
fn catmull2(a: vec2f, b: vec2f, c: vec2f, d: vec2f, t: f32) -> vec2f {
  let t2 = t * t; let t3 = t2 * t;
  return 0.5 * ((2.0 * b) + (-a + c) * t + (2.0 * a - 5.0 * b + 4.0 * c - d) * t2 + (-a + 3.0 * b - 3.0 * c + d) * t3);
}
fn catmull4(a: vec4f, b: vec4f, c: vec4f, d: vec4f, t: f32) -> vec4f {
  let t2 = t * t; let t3 = t2 * t;
  return 0.5 * ((2.0 * b) + (-a + c) * t + (2.0 * a - 5.0 * b + 4.0 * c - d) * t2 + (-a + 3.0 * b - 3.0 * c + d) * t3);
}
fn srgbToLinearChannel(value: f32) -> f32 {
  let low = value / 12.92; let high = pow((value + 0.055) / 1.055, 2.4);
  return select(high, low, value <= 0.04045);
}
fn srgbToLinear(color: vec4f) -> vec4f {
  return vec4f(srgbToLinearChannel(clamp(color.r, 0.0, 1.0)), srgbToLinearChannel(clamp(color.g, 0.0, 1.0)), srgbToLinearChannel(clamp(color.b, 0.0, 1.0)), clamp(color.a, 0.0, 1.0));
}
fn segment(value: f32) -> vec2f {
  let scaled = clamp(value, 0.0, 1.0) * 3.0; let index = min(floor(scaled), 2.0);
  return vec2f(index, scaled - index);
}
fn pointIndex(column: i32, row: i32) -> i32 { return row * 4 + column; }
fn meshPosition(parameter: vec2f) -> vec2f {
  let sx = segment(parameter.x); let sy = segment(parameter.y);
  let ix = i32(sx.x); let iy = i32(sy.x);
  let x0 = max(ix - 1, 0); let x1 = ix; let x2 = ix + 1; let x3 = min(ix + 2, 3);
  let y0 = max(iy - 1, 0); let y1 = iy; let y2 = iy + 1; let y3 = min(iy + 2, 3);
  let row0 = catmull2(uniforms.values[pointIndex(x0, y0)].xy, uniforms.values[pointIndex(x1, y0)].xy, uniforms.values[pointIndex(x2, y0)].xy, uniforms.values[pointIndex(x3, y0)].xy, sx.y);
  let row1 = catmull2(uniforms.values[pointIndex(x0, y1)].xy, uniforms.values[pointIndex(x1, y1)].xy, uniforms.values[pointIndex(x2, y1)].xy, uniforms.values[pointIndex(x3, y1)].xy, sx.y);
  let row2 = catmull2(uniforms.values[pointIndex(x0, y2)].xy, uniforms.values[pointIndex(x1, y2)].xy, uniforms.values[pointIndex(x2, y2)].xy, uniforms.values[pointIndex(x3, y2)].xy, sx.y);
  let row3 = catmull2(uniforms.values[pointIndex(x0, y3)].xy, uniforms.values[pointIndex(x1, y3)].xy, uniforms.values[pointIndex(x2, y3)].xy, uniforms.values[pointIndex(x3, y3)].xy, sx.y);
  return catmull2(row0, row1, row2, row3, sy.y);
}
fn meshColor(parameter: vec2f) -> vec4f {
  let sx = segment(parameter.x); let sy = segment(parameter.y);
  let ix = i32(sx.x); let iy = i32(sy.x);
  let x0 = max(ix - 1, 0); let x1 = ix; let x2 = ix + 1; let x3 = min(ix + 2, 3);
  let y0 = max(iy - 1, 0); let y1 = iy; let y2 = iy + 1; let y3 = min(iy + 2, 3);
  let offset = 16;
  let row0 = catmull4(srgbToLinear(uniforms.values[offset + pointIndex(x0, y0)]), srgbToLinear(uniforms.values[offset + pointIndex(x1, y0)]), srgbToLinear(uniforms.values[offset + pointIndex(x2, y0)]), srgbToLinear(uniforms.values[offset + pointIndex(x3, y0)]), sx.y);
  let row1 = catmull4(srgbToLinear(uniforms.values[offset + pointIndex(x0, y1)]), srgbToLinear(uniforms.values[offset + pointIndex(x1, y1)]), srgbToLinear(uniforms.values[offset + pointIndex(x2, y1)]), srgbToLinear(uniforms.values[offset + pointIndex(x3, y1)]), sx.y);
  let row2 = catmull4(srgbToLinear(uniforms.values[offset + pointIndex(x0, y2)]), srgbToLinear(uniforms.values[offset + pointIndex(x1, y2)]), srgbToLinear(uniforms.values[offset + pointIndex(x2, y2)]), srgbToLinear(uniforms.values[offset + pointIndex(x3, y2)]), sx.y);
  let row3 = catmull4(srgbToLinear(uniforms.values[offset + pointIndex(x0, y3)]), srgbToLinear(uniforms.values[offset + pointIndex(x1, y3)]), srgbToLinear(uniforms.values[offset + pointIndex(x2, y3)]), srgbToLinear(uniforms.values[offset + pointIndex(x3, y3)]), sx.y);
  return clamp(catmull4(row0, row1, row2, row3, sy.y), vec4f(0.0), vec4f(1.0));
}
@vertex fn vs_main(input: VertexInput) -> VertexOutput {
  let position = meshPosition(input.parameter);
  var output: VertexOutput;
  output.position = vec4f(position.x * 2.0 - 1.0, 1.0 - position.y * 2.0, 0.0, 1.0);
  output.color = meshColor(input.parameter);
  return output;
}
@fragment fn fs_main(input: VertexOutput) -> @location(0) vec4f { return input.color; }
`
  const resolveShader = `
diagnostic(off,derivative_uniformity);
@group(0) @binding(0) var source: texture_multisampled_2d<f32>;
struct VertexInput { @location(0) position: vec2f, @location(1) uv: vec2f, };
struct VertexOutput { @builtin(position) position: vec4f, @location(0) uv: vec2f, };
@vertex fn vs_main(input: VertexInput) -> VertexOutput {
  var output: VertexOutput; output.position = vec4f(input.position, 0.0, 1.0); output.uv = input.uv; return output;
}
fn linearToSrgbChannel(value: f32) -> f32 {
  let safeValue = max(value, 0.0); let low = safeValue * 12.92; let high = 1.055 * pow(safeValue, 1.0 / 2.4) - 0.055;
  return select(high, low, safeValue <= 0.0031308);
}
fn linearToSrgb(color: vec3f) -> vec3f {
  return vec3f(linearToSrgbChannel(color.r), linearToSrgbChannel(color.g), linearToSrgbChannel(color.b));
}
@fragment fn fs_main(input: VertexOutput) -> @location(0) vec4f {
  let dimensions = textureDimensions(source);
  let pixel = clamp(vec2i(input.position.xy), vec2i(0), vec2i(dimensions) - vec2i(1));
  let c0 = textureLoad(source, pixel, 0); let c1 = textureLoad(source, pixel, 1);
  let c2 = textureLoad(source, pixel, 2); let c3 = textureLoad(source, pixel, 3);
  let alphaSum = c0.a + c1.a + c2.a + c3.a;
  let weighted = c0.rgb * c0.a + c1.rgb * c1.a + c2.rgb * c2.a + c3.rgb * c3.a;
  let linearRgb = weighted / max(alphaSum, 0.000001);
  let covered = alphaSum > 0.0;
  let rgb = select(vec3f(0.0), clamp(linearToSrgb(linearRgb), vec3f(0.0), vec3f(1.0)), covered);
  return vec4f(rgb, alphaSum * 0.25);
}
`
  frame.state.meshModule = device.createShaderModule({ code: meshShader })
  frame.state.resolveModule = device.createShaderModule({ code: resolveShader })
  frame.state.uniformBuffer = device.createBuffer({ size: 512, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST })
  frame.state.quad = device.createBuffer({ size: 6 * 4 * 4, usage: GPUBufferUsage.VERTEX, mappedAtCreation: true })
  new Float32Array(frame.state.quad.getMappedRange()).set([-1, -1, 0, 1, 1, -1, 1, 1, -1, 1, 0, 0, -1, 1, 0, 0, 1, -1, 1, 1, 1, 1, 1, 0])
  frame.state.quad.unmap()
}

export function render(device, frame) {
  const clampNumber = (value, low, high) => Math.min(Math.max(value, low), high)
  const pointNames = ["p00","p10","p20","p30","p01","p11","p21","p31","p02","p12","p22","p32","p03","p13","p23","p33"]
  const uniformValues = new Float32Array(128)
  for (let index = 0; index < 16; index += 1) {
    const point = frame.params[pointNames[index]]
    uniformValues[index * 4] = clampNumber(point.x, 0, 100) / 100
    uniformValues[index * 4 + 1] = clampNumber(point.y, 0, 100) / 100
    uniformValues[(16 + index) * 4] = clampNumber(point.color.r, 0, 1)
    uniformValues[(16 + index) * 4 + 1] = clampNumber(point.color.g, 0, 1)
    uniformValues[(16 + index) * 4 + 2] = clampNumber(point.color.b, 0, 1)
    uniformValues[(16 + index) * 4 + 3] = clampNumber(point.color.a, 0, 1)
  }
  device.queue.writeBuffer(frame.state.uniformBuffer, 0, uniformValues)
  const tessellation = clampNumber(Math.round(frame.params.tessellation), 8, 256)
  if (frame.state.tessellation !== tessellation) {
    if (frame.state.gridVertices) frame.state.gridVertices.destroy()
    if (frame.state.gridIndices) frame.state.gridIndices.destroy()
    const side = tessellation + 1
    const vertices = new Float32Array(side * side * 2)
    let vertexOffset = 0
    for (let row = 0; row < side; row += 1) {
      for (let column = 0; column < side; column += 1) {
        vertices[vertexOffset] = column / tessellation
        vertices[vertexOffset + 1] = row / tessellation
        vertexOffset += 2
      }
    }
    const indices = new Uint32Array(tessellation * tessellation * 6)
    let indexOffset = 0
    for (let row = 0; row < tessellation; row += 1) {
      for (let column = 0; column < tessellation; column += 1) {
        const topLeft = row * side + column
        const topRight = topLeft + 1
        const bottomLeft = topLeft + side
        const bottomRight = bottomLeft + 1
        indices[indexOffset] = topLeft; indices[indexOffset + 1] = bottomLeft; indices[indexOffset + 2] = topRight
        indices[indexOffset + 3] = topRight; indices[indexOffset + 4] = bottomLeft; indices[indexOffset + 5] = bottomRight
        indexOffset += 6
      }
    }
    frame.state.gridVertices = device.createBuffer({ size: vertices.byteLength, usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST })
    frame.state.gridIndices = device.createBuffer({ size: indices.byteLength, usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST })
    device.queue.writeBuffer(frame.state.gridVertices, 0, vertices)
    device.queue.writeBuffer(frame.state.gridIndices, 0, indices)
    frame.state.indexCount = indices.length
    frame.state.tessellation = tessellation
  }
  if (frame.state.pipelineFormat !== frame.output.format) {
    frame.state.meshPipeline = device.createRenderPipeline({
      layout: "auto",
      vertex: { module: frame.state.meshModule, entryPoint: "vs_main", buffers: [{ arrayStride: 8, attributes: [{ shaderLocation: 0, format: "float32x2", offset: 0 }] }] },
      fragment: { module: frame.state.meshModule, entryPoint: "fs_main", targets: [{ format: frame.output.format }] },
      primitive: { topology: "triangle-list" },
      multisample: { count: 4 },
    })
    frame.state.resolvePipeline = device.createRenderPipeline({
      layout: "auto",
      vertex: { module: frame.state.resolveModule, entryPoint: "vs_main", buffers: [{ arrayStride: 16, attributes: [{ shaderLocation: 0, format: "float32x2", offset: 0 }, { shaderLocation: 1, format: "float32x2", offset: 8 }] }] },
      fragment: { module: frame.state.resolveModule, entryPoint: "fs_main", targets: [{ format: frame.output.format }] },
      primitive: { topology: "triangle-list" },
    })
    frame.state.pipelineFormat = frame.output.format
  }
  const w = frame.output.physicalWidth ?? frame.output.width
  const h = frame.output.physicalHeight ?? frame.output.height
  if (frame.state.msaaWidth !== w || frame.state.msaaHeight !== h || frame.state.msaaFormat !== frame.output.format) {
    if (frame.state.msaaTexture) frame.state.msaaTexture.destroy()
    frame.state.msaaTexture = device.createTexture({ size: [w, h, 1], format: frame.output.format, sampleCount: 4, usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING })
    frame.state.msaaWidth = w; frame.state.msaaHeight = h; frame.state.msaaFormat = frame.output.format
  }
  const meshBindGroup = device.createBindGroup({ layout: frame.state.meshPipeline.getBindGroupLayout(0), entries: [{ binding: 0, resource: { buffer: frame.state.uniformBuffer } }] })
  const resolveBindGroup = device.createBindGroup({ layout: frame.state.resolvePipeline.getBindGroupLayout(0), entries: [{ binding: 0, resource: frame.state.msaaTexture.createView() }] })
  const encoder = device.createCommandEncoder()
  const meshPass = encoder.beginRenderPass({ colorAttachments: [{ view: frame.state.msaaTexture.createView(), loadOp: "clear", clearValue: { r: 0, g: 0, b: 0, a: 0 }, storeOp: "store" }] })
  meshPass.setPipeline(frame.state.meshPipeline)
  meshPass.setBindGroup(0, meshBindGroup)
  meshPass.setVertexBuffer(0, frame.state.gridVertices)
  meshPass.setIndexBuffer(frame.state.gridIndices, "uint32")
  meshPass.drawIndexed(frame.state.indexCount)
  meshPass.end()
  const resolvePass = encoder.beginRenderPass({ colorAttachments: [{ view: frame.output.createView(), loadOp: "clear", clearValue: { r: 0, g: 0, b: 0, a: 0 }, storeOp: "store" }] })
  resolvePass.setPipeline(frame.state.resolvePipeline)
  resolvePass.setBindGroup(0, resolveBindGroup)
  resolvePass.setVertexBuffer(0, frame.state.quad)
  resolvePass.draw(6)
  resolvePass.end()
  device.queue.submit([encoder.finish()])
}

defineProperties(Effect, {})

export const manifest = {
  name: "Mesh gradient",
  version: 3,
  isAnimated: false,
  usesMouse: false,
  renderScaleAware: true,
}

/** Params from Figma Halva card 698:29995 */
export const halvaCardMeshParams = {
  p02: { x: 0, y: 67, color: { r: 0.8878630995750427, g: 0.7773980498313904, b: 0.9025917649269104, a: 1 } },
  p01: { x: 0, y: 33, color: { r: 0.8823529481887817, g: 0.7686274647712708, b: 0.8980392217636108, a: 1 } },
  p21: { x: 67, y: 33, color: { r: 0.8999999761581421, g: 0.699999988079071, b: 0.44999998807907104, a: 1 } },
  p30: { x: 100, y: 0, color: { r: 1, g: 0.8199999928474426, b: 0.4000000059604645, a: 1 } },
  p20: { x: 67, y: 0, color: { r: 1, g: 0.8199999928474426, b: 0.41999998688697815, a: 1 } },
  p03: { x: 0, y: 100, color: { r: 0.8392156958580017, g: 0.6039215922355652, b: 0.8705882430076599, a: 1 } },
  tessellation: 155,
  p33: { x: 100, y: 100, color: { r: 0.07000000029802322, g: 0.5400000214576721, b: 0.699999988079071, a: 1 } },
  p00: { x: 0, y: 0, color: { r: 1, g: 0.41999998688697815, b: 0.41999998688697815, a: 1 } },
  p23: { x: 67, y: 100, color: { r: 0.8392156958580017, g: 0.6039215922355652, b: 0.8705882430076599, a: 1 } },
  p12: { x: 33, y: 67, color: { r: 0.8392156958580017, g: 0.6039215922355652, b: 0.8705882430076599, a: 1 } },
  p22: { x: 67, y: 67, color: { r: 0.8391016721725464, g: 0.60296630859375, b: 0.8702892661094666, a: 1 } },
  p32: { x: 100, y: 67, color: { r: 0.8392156958580017, g: 0.6039215922355652, b: 0.8705882430076599, a: 1 } },
  p13: { x: 33, y: 100, color: { r: 0.8392156958580017, g: 0.6039215922355652, b: 0.8705882430076599, a: 1 } },
  p10: { x: 33, y: 0, color: { r: 1, g: 0.6399999856948853, b: 0.41999998688697815, a: 1 } },
  p11: { x: 22.549348831176758, y: 32.27761459350586, color: { r: 0.800000011920929, g: 0.550000011920929, b: 0.5, a: 1 } },
  p31: { x: 100, y: 33, color: { r: 0.9490196108818054, g: 0.7254902124404907, b: 0.3960784375667572, a: 1 } },
}
