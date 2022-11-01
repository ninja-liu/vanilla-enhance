# @vanilla-enhance/epromise

<hr/>

>enhance vanilla Promise to provide practical usage.
## Table of Contents

<hr/>

<ul>
	<li><a href="#Highlights">Highlights</a> </li>
	<li><a href="#useage">Usage</a></li>
    <li><a href="#api">APIs</a>
    <dl>
        <dt>Static</dt>
        <dd><a href="#static-all">all</a></dd>
    </dl>
    </li>
    <li><a href="#Warnings">Warnings</a>
</ul>


<h2 id="Highlights">Highlights</h3>

<hr/>
	<dl>
        <dt><span style="color: #ffe4c4; ">all</span></dt>
		<dd>
            <ul>
                <li>enable to resolve objects with values of promise.</li>
            </ul>
        </dd>
	</dl>


<h2 id="useage">Usage</h3>

<hr/>
<h3 style="color: #ffe4c4;" id="static-all">all</h3>

```js
static async all<T>(inMap: Record<string, Promise<T>>): Promise<Record<string, T>>
```

<h5>for example:<h5/>

```js
import {EPromise} from '@vanilla-enhance/epromise';
EPromise.all({
  one:new Promise(resolve=>{
    setTimeout(_=>{
      resolve('haha1')
    },3000)
  }),
  two:new Promise(resolve=>{
    setTimeout(_=>{
      resolve('haha2')
    },1000)
  }),
  three:Promise.resolve(3),
}).then(console.log) //=>{ one: 'haha1', two: 'haha2', three: 3 }
```

## Changelog

The changelog can be found on the [Releases page](https://gitee.com/vanilla-enhance/epromise/releases).

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](Contributing.md).

## Authors and license

[XiaohuLiu](https://gitee.com/vanilla-enhance/epromise.git) and [contributors](https://gitee.com/vanilla-enhance/epromise/graphs/contributors).

MIT License, see the included [License.md](License.md) file.
