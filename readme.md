#### 问题1. vuex中的store是如何注入的，如何做到初始化执行一次初始化,new Vue({store})之后， 每个组件调用this.$store都能指向store本store？
  直接看vuex的源码可以得知，在store.js中，输出了如下函数。Vue.use(vuex)的时候，会自动执行hook到install中。看到这里其实调用了一个applyMixin函数。进去看看这个applyMixin函数做了什么事情。
  
    export function install (_Vue) {
      if (Vue && _Vue === Vue) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(
            '[vuex] already installed. Vue.use(Vuex) should be called only once.'
          )
        }
        return
      }
      Vue = _Vue
      applyMixin(Vue)
    }
  
    找到头部的调用，mixin.js主要做了两件事情。代码如下所示
    首先判断了vue的版本，如果是2.0以上的版本，劫持了Vue的beforeCreate方法，在组件创建之前，执行vuexInit函数。
  如果是1.x版本的话，重新Vue的init方法。在组件初始化的时候调用vuexInit。
  
  export default function (Vue) {
    const version = Number(Vue.version.split('.')[0])

    if (version >= 2) {
      Vue.mixin({ beforeCreate: vuexInit })
    } else {
      // override init and inject vuex init procedure
      // for 1.x backwards compatibility.
      const _init = Vue.prototype._init
      Vue.prototype._init = function (options = {}) {
        options.init = options.init
          ? [vuexInit].concat(options.init)
          : vuexInit
        _init.call(this, options)
      }
    }

    下面是最重要的部分，vuex初始化函数，经过上面的步骤处理，每个vue组件在初始化的时候，都会执行到这里。
    这里是判断并且找到 options.parent.$store ，然后赋值给当前，this.$store. 
    这样我们在使用的时候，不管身处哪个组件，就都能调用到this.$store了.
    很简单的几个步骤，这种设计的思想能用到日常编码中的很多地方。
    /**
     * Vuex init hook, injected into each instances init hooks list.
     */

    function vuexInit () {
      const options = this.$options
      // store injection
      if (options.store) {
        this.$store = typeof options.store === 'function'
          ? options.store()
          : options.store
      } else if (options.parent && options.parent.$store) {
        this.$store = options.parent.$store
      }
    }
  }
  #### 问题2  vue中的虚拟Dom机制以及虚拟Dom的Diff算法更新机制？
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;

const float pi = atan(1.0) * 4.0;

float scale    = 0.01;                   // 1e-2
float epsilon  = 0.0001;                 // 1e-4
float infinity = 100000.0;               // 1e6

#define THICKNESS       0.001            // 1e-3
#define BORDER_COLOR    vec3(.15, .12, 1.)
#define BRIGHTNESS      0.015
#define BORDER_GAP      4.0
#define BORDER_CORNER   46.0
	
float dfLine(vec2 start, vec2 end, vec2 uv)
{
	start *= scale;    // rescale
	end   *= scale;    // rescale

	vec2 line = end - start;
	
	float frac = dot(uv - start,line) / dot(line,line);
	
	return distance(start + line * clamp(frac, 0.0, 1.0), uv);
}

float dfArc(vec2 origin, float start, float sweep, float radius, vec2 uv)
{
	origin *= scale;   // rescale
	radius *= scale;   // rescale
	
	uv -= origin;      // move
	
	sweep = -sweep;
	
	uv *= mat2( cos(start), sin(start), -sin(start), cos(start) ); // rotate to start
	
	float offset = (sweep / 2.0 - pi);
	
        float angle = mod(atan(uv.y,uv.x) - offset, 2.0 * pi) + offset;
	
	angle = clamp(angle, min(0.0, sweep), max(0.0, sweep));
	
	return distance(radius * vec2(cos(angle), sin(angle)), uv);
}

float DrawFrame(vec2 uv, vec2 leftBottom, vec2 rightTop) 
{
	float dist = infinity;
	
	float corner = BORDER_CORNER;
	
	dist = min(dist, dfLine(vec2(rightTop.x   - corner, rightTop.y            ), vec2(leftBottom.x  + corner, rightTop.y             ), uv)); // Top
	dist = min(dist, dfLine(vec2(leftBottom.x         , rightTop.y    - corner), vec2(leftBottom.x           , leftBottom.y  + corner), uv)); // Left
	dist = min(dist, dfLine(vec2(rightTop.x           , leftBottom.y  + corner), vec2(rightTop.x             , rightTop.y    - corner), uv)); // Right
	dist = min(dist, dfLine(vec2(leftBottom.r + corner, leftBottom.y          ), vec2(rightTop.x    - corner, leftBottom.y           ), uv)); // Bottom
	
	dist = min(dist, dfArc(vec2(leftBottom.x  + corner, rightTop.y    - corner), -3.14, 1.57, corner, uv));                                   // Top Left
	dist = min(dist, dfArc(vec2(leftBottom.x  + corner, leftBottom.y  + corner), -1.57, 1.57, corner, uv));                                   // Bottom Line
	dist = min(dist, dfArc(vec2(rightTop.x    - corner, rightTop.y    - corner),  1.57, 1.57, corner, uv));                                   // Top Right
	dist = min(dist, dfArc(vec2(rightTop.x    - corner, leftBottom.y  + corner),  0.0,  1.57, corner, uv));                                   // Bottom Right
	
	return dist;
}

void main(void)
{
	vec2 uv = (gl_FragCoord.xy) / min(resolution.x, resolution.y);
	
	vec2 leftBottom = vec2(0.0);
	vec2 rightTop = vec2(100.0);
	
	if (resolution.x > resolution.y)
		rightTop.x *= (resolution.x / resolution.y);
	else
		rightTop.y *= (resolution.y / resolution.x);
	
	leftBottom = leftBottom + BORDER_GAP;
	rightTop   = rightTop   - BORDER_GAP;
		
	vec3 color = vec3(0.0);

	float dist = infinity;
	
	dist = DrawFrame(uv, leftBottom, rightTop);
	
	float shade = BRIGHTNESS / max(epsilon, dist - THICKNESS);
	
	color += BORDER_COLOR * shade;
	
	gl_FragColor = vec4(color, 1.0);
}
