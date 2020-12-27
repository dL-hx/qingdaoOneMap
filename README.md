## 技术栈
### artTemplate
https://aui.github.io/art-template/docs/
### echarts
https://www.echartsjs.com/zh/tutorial.html


## artTemplate 简介语法模板
https://www.cnblogs.com/susan-home/p/8548579.html

V1.0
<!-- 分页模板 -->
<script type="text/html" id="pageTpl">
	<li class="fiveword">总共({{total}})条</li>

	<li class="twoword"><a href="javascript:" onclick="changePage({{1}})">首页</a></li>

	{{if pageNow > 1}}
	<li class="threeword"><a href="javascript:" onclick="changePage({{pageNow - 1}})">上一页</a></li>
	{{/if}}

	{{each display value idx}}
	<li {{if pageNow== value }} class="curPage" {{/if}}>
	<a href="javascript:"
	   onclick="changePage({{value}})">{{value }}</a>
	</li>
	{{/each}}
	</tr>

	{{if pageNow < pageTotal}}
	<li class="threeword"><a href="javascript:" onclick="changePage({{pageNow + 1}})">下一页</a></li>
	{{/if}}

	<li class="twoword"><a href="javascript:" onclick="changePage({{pageTotal}})">末页</a></li>

</script>




V 2.0 解决页码过多的问题 : 前三/后二
> 参考链接:  https://blog.csdn.net/weixin_30724853/article/details/96260732
<script type="text/html" id="pageTpl">
	<li class="fiveword">总共({{total}})条</li>

	<li class="twoword"><a href="javascript:" onclick="changePage({{1}})">首页</a></li>

	{{if pageNow > 1}}
	<li class="threeword"><a href="javascript:" onclick="changePage({{pageNow - 1}})">上一页</a></li>
	{{/if}}

	{{if(pageNow - 3 > 0)}}
	<li><a href="javascript:" onclick="changePage({{pageNow - 3}})">{{pageNow - 3}}</a></li>
	{{/if}}

	{{if(pageNow - 2 > 0)}}
	<li><a href="javascript:" onclick="changePage({{pageNow - 2}})">{{pageNow - 2}}</a></li>
	{{/if}}

	{{if(pageNow - 1 > 0)}}
	<li><a href="javascript:" onclick="changePage({{pageNow - 1}})">{{pageNow - 1}}</a></li>
	{{/if}}

	<li class="curPage"><a href="javascript:" onclick="changePage({{pageNow}})">{{pageNow}}</a></li>

	{{if(pageNow + 1 <= pageTotal)}}
	<li><a href="javascript:" onclick="changePage({{pageNow + 1}})">{{pageNow + 1}}</a></li>
	{{/if}}

	{{if(pageNow + 2 <= pageTotal)}}
	<li><a href="javascript:" onclick="changePage({{pageNow + 2}})">{{pageNow + 2}}</a></li>
	{{/if}}

	{{if pageNow < pageTotal}}
	<li class="threeword"><a href="javascript:" onclick="changePage({{pageNow + 1}})">下一页</a></li>
	{{/if}}

	<li class="twoword"><a href="javascript:" onclick="changePage({{pageTotal}})">末页</a></li>

	<li style="border: transparent;margin-top:3px;    display: flex;"><span style="color: #ffc900;">{{pageNow}}</span>/{{pageTotal}}</li>
</script>

## 浅析前端工程化
https://www.cnblogs.com/ihardcoder/p/5378290.html

