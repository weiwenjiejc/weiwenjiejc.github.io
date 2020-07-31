使用

```java
String regex = "";//正则表达式
Pattern pattern = Pattern.compile(regex);
String input = "";//字符串
Matcher matcher = pattern.matcher(input);
while (matcher.find()){
    String group = matcher.group();
}
```





```java
package pachong;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Test_href {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String str = "<a href=\"http://bugreport.sun.com/bugreport/\">";
		
	
		String re = "(?<=(href=\")).*(?=\")";
		Pattern compile = Pattern.compile(re);
		Matcher matcher = compile.matcher(str);
		while(matcher.find()) {
			String group = matcher.group();
			System.out.println(group);
		}
	}

}

```



如同^代表开头，$代表结尾，\b代表单词边界一样



1. (?=Expression) 先行肯定断言，表示所在位置右侧能够匹配Expression, 结果不包含Expression
2. (?!Expression) 先行否定断言，表示所在位置右侧不能匹配Expression, 结果不包含Expression
3. (?<=Expression) 后行肯定断言，表示所在位置左侧能够匹配Expression, 结果不包含Expression
4. (?<!Expression) 后行否定断言，表示所在位置左侧不能匹配Expression, 结果不包含Expression





- (?=pattern) 正向先行断言
  代表字符串中的一个位置，紧接该位置之后的字符序列能够匹配pattern。
  例如对”a regular expression”这个字符串，要想匹配regular中的re，
  但不能匹配expression中的re，可以用”re(?=gular)”，
  该表达式限定了re右边的位置，这个位置之后是gular，但并不消耗gular这些字符，
  将表达式改为”re(?=gular).”，将会匹配reg，元字符.匹配了g，括号这一砣匹配了e和g之间的位置。
- (?!pattern) 负向先行断言
  代表字符串中的一个位置，紧接该位置之后的字符序列不能匹配pattern。
  例如对”regex represents regular expression”这个字符串，
  要想匹配除regex和regular之外的re，可以用”re(?!g)”，
  该表达式限定了re右边的位置，这个位置后面不是字符g。负向和正向的区别，
  就在于该位置之后的字符能否匹配括号中的表达式。
- (?<=pattern) 正向后行断言
  代表字符串中的一个位置，紧接该位置之前的字符序列能够匹配pattern。
  例如对”regex represents regular expression”这个字符串，
  有4个单词，要想匹配单词内部的re，但不匹配单词开头的re，可以用”(?<=\w)re”，
  单词内部的re，在re前面应该是一个单词字符。之所以叫后行断言，
  是因为正则表达式引擎在匹配字符串和表达式时，是从前向后逐个扫描字符串中的字符，
  并判断是否与表达式符合，当在表达式中遇到该断言时，
  正则表达式引擎需要往字符串前端检测已扫描过的字符，相对于扫描方向是向后的。
- (?<!pattern) 负向后行断言
  代表字符串中的一个位置，紧接该位置之前的字符序列不能匹配pattern。
  例如对”regex represents regular expression”这个字符串，
  要想匹配单词开头的re，可以用”(?<!\w)re”。单词开头的re，在本例中，
  也就是指不在单词内部的re，即re前面不是单词字符。当然也可以用”\bre”来匹配。

记忆总结：

?，先行断言；?<后行断言；后面加=是正向，加!是负向

先行是根据后面的正则，匹配前面的字符串