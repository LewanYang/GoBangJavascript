/*两个数组，（1）赢法数组；（2）赢法统计数组，每一种赢法实现的程度；
如何判断胜负和计算机如何落子都会基于赢法统计数组来统计*/



////////////////////////////////////////////////////////////////////////////////////////
//赢法数组


var wins=[];

//设置一个三维数组

for(var i=0;i<15;i++)
{
	wins[i]=[];
	for(var j=0;j<15;j++)
	{
		wins[i][j]=[];//这里还是一个数组，所以wins会是一个三维数组；
	}
}

var count=0; //这个count代表赢法种类的索引；

//打竖的赢法遍历一遍

for(var i=0;i<15;i++)
{
	for(var j=0;j<11;j++)
	{
		for(var k=0;k<5;k++)
		{
			wins[i][j+k][count]=true;
		}
		count++;//k循环完一遍后即5次后就count加一，新的一个赢法；
	}
}

//打横的赢法遍历一遍
for(var i=0;i<15;i++)
{
	for(var j=0;j<11;j++)
	{
		for(var k=0;k<5;k++)
		{
			wins[j+k][i][count]=true;
		}
		count++;//k循环完一遍后即5次后就count加一，新的一个赢法；
	}
}

//从左上到右下
for(var i=0;i<11;i++)
{
	for(var j=0;j<11;j++)
	{
		for(var k=0;k<5;k++)
		{
			wins[i+k][j+k][count]=true;
		}
		count++;//k循环完一遍后即5次后就count加一，新的一个赢法；
	}
}


//从坐下到右上
for(var i=0;i<11;i++)
{
	for(var j=14;j>3;j--)
	{
		for(var k=0;k<5;k++)
		{
			wins[i+k][j-k][count]=true;
		}
		count++;//k循环完一遍后即5次后就count加一，新的一个赢法；
	}
}

console.log(count);//五子棋到底有多少种赢法



//////////////////////////////////////////////////////////////////////////////////////////////
//赢法统计数组

var myWin=[];
var computerWin=[];//这两个数组都是一维的数组；

//初始化 ？这里有个疑问，问什么不是i<=count，如果只是<,会不会少算了一种；
for(var i=0; i<count;i++)
{
	myWin[i]=0;
	computerWin[i]=0;
}



