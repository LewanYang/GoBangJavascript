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


////////////////////////////////////////////////////////////////////////////////////////////////
//计算机人工智能算法函数

function computerAI_2()
{
	//创建两个二维数组
	var myScore=[];
	var computerScore=[];
	var max=0;
	var u=0;
	var v=0;


	//初始话数组
	for(var i=0;i<15;i++)
	{
		myScore[i]=[];
		computerScore[i]=[];
		for(var j=0;j<15;j++)
		{
			myScore[i][j]=0;
			computerScore[i][j]=0;			
		}
	}


	//对空闲位置点进行打分判断
	for(var d=0;d<aTd.length;d++)
	{
		if(aTd[d].style.background!='url(images/black.gif)'&&aTd[d].style.background!='url(images/white.gif)')//假如这个位置没有棋子
		{
            var i=aTd[d].cellIndex;
            var j=aTd[d].parentElement.rowIndex;

            for(var k;k<count;k++)
            {
            	if(wins[i][j][k])
            	{
            		if(myWin[k]==1)
            		{
            			myScore[i][j]+=200;
            		}
            		else if(myWin[k]==2)
            		{
            			myScore[i][j]+=400;
            		}
            		else if(myWin[k]==3)
            		{
            			myScore[i][j]+=2000;
            		}
            		else if(myWin[k]==4)
            		{
            			myScore[i][j]+=10000;
            		}
            		if(computerWin[k]==1)
            		{
            			computerScore[i][j]+=220;
            		}
            		else if(computerWin[k]==2)
            		{
            			computerScore[i][j]+=420;
            		}
            		else if(computerWin[k]==3)
            		{
            			computerScore[i][j]+=2100;
            		}
            		else if(computerWin[k]==4)
            		{
            			computerScore[i][j]+=20000;
            		}
            	}
            }
            if(myScore[i][j]>max)
            {
            	max=myScore[i][j];
            	u=i;
            	v=j;
            }
            else if(myScore[i][j]==max)
            {
            	if(computerScore[i][j]>computerScore[u][v])
            	{
            		u=i;
            		v=j;
            	}
            }
            if(computerScore[i][j]>max)
            {
            	max=computerScore[i][j];
            	u=i;
            	v=j;
            }
            else if(computerScore[i][j]==max)
            {
            	if(myScore[i][j]>myScore[u][v])
            	{
            		u=i;
            		v=j;
            	}
            }

		}
	}
	alert(u,v);
	//机器人落子
	for(var i=0;i<aTd.length;i++)
	{
		if(aTd[i].cellIndex==u && aTd[i].parentElement.rowIndex==v)
		{
			aTd[i].style.background='url(images/white.gif)';

		}
	}
	//判断机器人有没有赢
	                    for(var k=0;k<count;k++)
                	    {
                	    	if(wins[u][v][k])
                	    	{
                	    		computerWin[k]++;
                	    		myWin[k]=6;
                	    		if(computerWin[k]==5)
                	    		{
                	    			window.alert('电脑赢了');
                	    			isWin=true;
                	    			break;
                	    		}
                	    	}
                	    }

}

 