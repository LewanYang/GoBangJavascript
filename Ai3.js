    window.onload=function()
    {

        var aTd=document.getElementsByTagName('td');

        var curr='white';
      
        var isWin=false;

        var oGezi=document.getElementById('gezi');



        //当鼠标移入棋盘的时候
        oGezi.onmouseover=function()
        {
            startMove(oGezi,{opacity:100});
        }

        for(var i=0;i<aTd.length;i++)
        {
            aTd[i].color='n';
            aTd[i].onclick=Xiaqi;                       
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //下棋
        function Xiaqi()
        {
                if(isWin)
                {
                    alert('下次再玩');
                }
                else
                {
                  if(this.style.background)
                  {
                    alert('这里有棋子了');
                  }
                    else
                    {
/*                      if(curr=='black')
                    {
                     curr='white';
                     this.color='w';
                    }
                    else
                    {
                    curr='black';
                    this.color='b';
                    }
                    this.style.background='url(images/'+curr+'.gif)';*/
/*                      alert(this.cellIndex+','+this.parentElement.rowIndex);*/
                    /*JudgeWin(this.cellIndex,this.parentElement.rowIndex);*/
                    this.style.background='url(images/black.gif)';
//另一种方法;                    
                        for(var k=0;k<count;k++)
                        {
                            //这里是为什么呢，为什么说下面这个是true时，它不是一直都是true吗
                            //明白了，不是所有都是true，注意，遍历的是赢法的种类
                            if(wins[this.cellIndex][this.parentElement.rowIndex][k])
                            {
                                myWin[k]++;
                                computerWin[k]=6;
                                if(myWin[k]==5)
                                {
                                    window.alert('你赢了');
                                    isWin=true;
                                }
                            }
                        }
                        if(!isWin)
                        {
                            computerAI();
                        }
                    }
                 }
        }

        //判断是否有棋
        function judgeQi(x,y)
        {
            for(var d=0;d<aTd.length;d++)
            {
                if(aTd[d].cellIndex==x&&aTd[d].parentElement.rowIndex==y)
                {
                    if(aTd[d].style.background)
                    {
                        return true; //有棋
                    }
                }               
            }
        }  
 
        //封装一个函数，用于判断是第几个td
        function getTd(x,y)
        {
            for(var d=0;d<aTd.length;d++)
            {
                if(aTd[d].cellIndex==x&&aTd[d].parentElement.rowIndex==y)
                {
                                        
                        return aTd[d]; 
                    
                }               
            }            
        }

        //电脑下棋的函数
        function computerAI()
        {
            var myScore=[];
            var computerScore=[];
            var max=0;
            var u=0;
            var v=0;

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

            for(var i=0;i<15;i++)
            {
                for(var j=0;j<15;j++)
                {
                    if(!judgeQi(i,j))//没有棋的情况下
                    {
                       for(var k=0;k<count;k++)
                       {
                        if(wins[i][j][k])
                        {
                            if(myWin[k]==1)
                            {
                                myScore[i][j]+=15;
                            }
                            else if(myWin[k]==2)
                            {
                                myScore[i][j]+=400;
                            }
                            else if(myWin[k]==3)
                            {
                                myScore[i][j]+=1800;
                            }
                            else if(myWin[k]==4)
                            {
                                myScore[i][j]+=800000;
                            }
                            else if(myWin[k]==5)
                            {
                                myScore[i][j]+=950000;
                            }
                            if(computerWin[k]==1)
                            {
                                computerScore[i][j]+=35;
                            }
                            else if(computerWin[k]==2)
                            {
                                computerScore[i][j]+=800;
                            }
                            else if(computerWin[k]==3)
                            {
                                computerScore[i][j]+=15000;
                            }
                            else if(computerWin[k]==4)
                            {
                                computerScore[i][j]+=800000;
                            }
                            else if(computerWin[k]==5)
                            {
                                computerScore[i][j]+=1000000;
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
            }
            getTd(u,v).style.background='url(images/white.gif)';
            //判断机器人是否获胜
            for(var k=0;k<count;k++)
            {
                //这里是为什么呢，为什么说下面这个是true时，它不是一直都是true吗
                //明白了，不是所有都是true，注意，遍历的是赢法的种类
                if(wins[u][v][k])
                {
                    computerWin[k]++;
                    myWin[k]=6;
                    if(computerWin[k]==5)
                    {
                        window.alert('计算机赢了');
                        isWin=true;
                    }
                }
            }
        }

        //获取当前表格单元格情况；
        var oTx1=document.getElementById('tex1');
        var oTx2=document.getElementById('tex2');
        var oBt=document.getElementById('bt1');
        //封装一个函数，用于获取td格上的颜色属性
        function getColor(x,y)
        {
            for(var i=0;i<aTd.length;i++)
            {
                if(aTd[i].cellIndex==x&&aTd[i].parentElement.rowIndex==y)
                {
                    return aTd[i].color;
                }               
            }
        }
        //使用这个函数的例子
/*        oBt.onclick=function()
        {
            var x=oTx1.value;
            var y=oTx2.value;

            alert(getColor(x,y));
        }
*/
/////////////////////////////////////////////////////////////////////
        //判断是否获胜 这是第二种方法，在这里没有使用这种方法
        //A.当下了这步棋后，遍历这步棋的（1）打横方向（2）打竖方向（3）左上到右下（4）右上到左下，若这四个方向存在五个棋子连续相同颜 色，就判断获胜；
        //B.
        //规律（1）打横方向：y相等；（2）打竖方向：x相等；（3）左上到右下：相邻两个棋子(y-x)相等；（4）右上到左下：相邻两个棋子(x+y)相等；
        //利用indexOf()方法判断——indexOf可以判断某个指定的字符串值在字符串中首次出现的位置；
        function JudgeWin(x,y)
        {
            var line=['','','','']; //用于存放四个方向上的颜色情况
            for(var i=0;i<aTd.length;i++)
            {
                //打横方向
                if(y==aTd[i].parentElement.rowIndex)
                {
                    line[0]=line[0]+getColor(aTd[i].cellIndex,aTd[i].parentElement.rowIndex);
                }
            }

            for(var i=0;i<aTd.length;i++)
            {
                //打竖方向
                if(x==aTd[i].cellIndex)
                {
                    line[1]=line[1]+getColor(aTd[i].cellIndex,aTd[i].parentElement.rowIndex);
                }
            }

            for(var i=0;i<aTd.length;i++)
            {
                //左上到右下
                if((y-x)==(aTd[i].parentElement.rowIndex-aTd[i].cellIndex))
                {
                    line[2]=line[2]+getColor(aTd[i].cellIndex,aTd[i].parentElement.rowIndex);
                }
            }

            for(var i=0;i<aTd.length;i++)
            {
                //右上到左下
                if((y+x)==(aTd[i].parentElement.rowIndex+aTd[i].cellIndex))
                {
                    line[3]=line[3]+getColor(aTd[i].cellIndex,aTd[i].parentElement.rowIndex);
                }                               
            }


            for(var i=0;i<line.length;i++)
            {
                if(line[i].indexOf('bbbbb')>=0)
                {
                    alert('黑棋赢了！');
                    isWin=true;
                    break;
                }
            }

            for(var i=0;i<line.length;i++)
            {
                if(line[i].indexOf('wwwww')>=0)
                {
                    alert('白旗赢了！');
                    isWin=true;
                    break;
                }
            }
        } 
    }