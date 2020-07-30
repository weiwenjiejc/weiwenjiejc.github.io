

JNDI（Java Naming and Directory Interface ），类似于在一个中心注册一个东西，以后要用的时候，只需要根据名字去注册中心查找，注册中心返回你要的东西。

# 代理



## cglib代理



```xml
<dependency>
    <groupId>cglib</groupId>
    <artifactId>cglib-nodep</artifactId>
    <version>3.2.12</version>
</dependency>
```



# Java容器

## List



```java
public static void main(String[] args) {
        ArrayList<String> arrayList = new ArrayList<>();
        arrayList.add("a");
        arrayList.add("b");
        arrayList.add("c");

        //输出方式一，lambda表达式
        arrayList.forEach(x-> System.out.println(x));

        //输出方式二，lambda简写
        arrayList.forEach(System.out::println);
    }
```



# Java泛型

> 泛型是 Java 1.5 版本才引进的概念，在这之前是没有泛型的概念的，但显然，泛型代码能够很好地和之前版本的代码很好地兼容。
>
> 这是因为，**泛型信息只存在于代码编译阶段，在进入 JVM 之前，与泛型相关的信息会被擦除掉，专业术语叫做类型擦除**。

* 提供了一种类型检测的机制，只有相匹配的数据才能正常的赋值，否则编译器就不通过。
* 泛型提高了程序代码的可读性，不必要等到运行的时候才去强制转换，在定义或者实例化阶段



```java
public static void main(String[] args) {
        ArrayList<String> stringArrayList = new ArrayList<>();
        ArrayList<Integer> integerArrayList = new ArrayList<>();


        Class<? extends ArrayList> aClass = stringArrayList.getClass();
        Class<? extends ArrayList> aClass1 = integerArrayList.getClass();
        if (aClass == aClass1)
            System.out.println(true);
        else
            System.out.println(false);

        //输出true
        //List<String>和 List<Integer>在 jvm 中的 Class 都是 List.class。
    }
```



```java
class Demo<T>{
    T object;

    public Demo(T object) {
        this.object = object;
    }

    public Demo() {

    }

    public void add(T object){

    }
}
public class Java8 {
    public static void main(String[] args) {
        Demo<String> demo = new Demo<>();
        Class<? extends Demo> demoClass = demo.getClass();

        
        String param = "param";
        demo.add(param);
        
        //下面是错误的，这就是泛型的缺点
        /*
        Integer paramInt = 5;
        demo.add(paramInt);
        */
        

        Method[] declaredMethods = demoClass.getDeclaredMethods();
        for (Method declaredMethod : declaredMethods) {
            System.out.println(declaredMethod);
        }
        //输出：public void Demo.add(java.lang.Object)
        //可以看出add函数类型已经被擦除为Object了
    }

}
```



**可以利用类型擦除的原理，用反射的手段就绕过了正常开发中编译器不允许的操作限制**

列子一

```java
class Demo<T>{
    T object;

    public Demo(T object) {
        this.object = object;
    }

    public Demo() {

    }

    public void add(T object){
        System.out.println(object);
    }
}
public class Java8 {
    public static void main(String[] args) {

        Demo<String> demo = new Demo<>();
        Class<? extends Demo> demoClass = demo.getClass();

        String param = "param";
        demo.add(param);

        //下面是错误的，这就是泛型的缺点
        /*
        Integer paramInt = 5;
        demo.add(paramInt);
        */

        /*
        通过反射，使的上面的Integer可以正常输出，add函数类型擦除之后，参数类型变为Object了，不再是String
         */
        try {
            //修改参数类型为Object，就可以输出任意类型的
            Method add = demoClass.getDeclaredMethod("add", Object.class);
            Object invoke = add.invoke(demo, 5);
        }catch (Exception e){
            System.out.println("输出异常");
            e.printStackTrace();
        }

    }

}
```

例子二

>因为类型擦除，它会抹掉很多继承相关的特性，这是它带来的局限性。使用反射绕过泛型

```java
public static void main(String[] args) {

        ArrayList<Integer> arrayList = new ArrayList<>();
        arrayList.add(5);
        // arrayList.add("588"); 编译不通过

        Class<? extends ArrayList> arrayListClass = arrayList.getClass();

        try {
            Method add = arrayListClass.getDeclaredMethod("add", Object.class);
            Object invoke = add.invoke(arrayList, "你好");
            System.out.println(invoke);

        }catch (Exception e){
            System.out.println("输出异常");
        }
        //arrayList.forEach(x-> System.out.println(x));//输出会出错，这个函数还是有类型的
        for(Object x: arrayList){
            System.out.println(x);
        }
    }

/*输出
true
5
你好
*/
```







## 通配符

通配符有 3 种形式。

1. `<?>`被称作无限定的通配符。
2. `<? extends T>`被称作有上限的通配符。
3. `<? super T>`被称作有下限的通配符。

# Java8新特性

## Lambda 



Lambda 允许把函数作为一个方法的参数

```shell
# 语法
(parameters) -> expression
或
(parameters) ->{ statements; }
```

lambda表达式的重要特征:

- **可选类型声明：**不需要声明参数类型，编译器可以统一识别参数值。
- **可选的参数圆括号：**一个参数无需定义圆括号，但多个参数需要定义圆括号。
- **可选的大括号：**如果主体包含了一个语句，就不需要使用大括号。
- **可选的返回关键字：**如果主体只有一个表达式返回值则编译器会自动返回值，大括号需要指定明表达式返回了一个数值。

**使用lambda表达式实现接口**

```java
interface IDemo{

    int sum(int a, int b);

    default void show(){
        System.out.println("你好");
    }
}

public class Java8 {
    public static void main(String[] args) {

        //使用lambda表达式
        IDemo iDemo = (a, b) -> a + b;
        System.out.println(iDemo.sum(3, 5));
        
        //使用匿名类实现
        IDemo iDemo = new IDemo() {
            @Override
            public int sum(int a, int b) {
                return a + b;
            }
        };
        //使用方法引用
        IDemo iDemo = Java8::sum;
        System.out.println(iDemo.sum(3, 5));
    }
    
    //被引用的方法
    static int sum(int a, int b){
        return a + b;
    }
}
```



### 双冒号（方法引用）



双冒号（::）运算符在Java 8中被用作**方法引用（method reference）**，它提供了一种不执行方法的方法

>双冒号运算操作符是类方法的句柄，lambda 表达式的一种简写

**出现原因**

>使用lambda表达式会创建匿名方法， 但有时候需要使用一个lambda表达式调用一个已经存在的方法（不做其它）， 所以这才有了方法引用！

例子

```java
public class Java8 {
    public static void main(String[] args) {

        List<String> stringList = Arrays.asList("a", "b", "c");
        
        //forEach需要传入一个函数
        //Java8::show 就是对已有静态方法的引用
        stringList.forEach(Java8::show);
        
        //lambda表达式匿名方法
        stringList.forEach(x-> System.out.println(x));
        
        //使用匿名类
        stringList.forEach(new Consumer<String>(){

            @Override
            public void accept(String s) {
                System.out.println(s);
            }

            @Override
            public Consumer<String> andThen(Consumer<? super String> after) {
                return null;
            }
        });

    }
    static void show(String x){
        System.out.println(x);
    }
}
```



方法引用的一些语法：

1. 静态方法引用（static method）语法：classname::methodname 例如：Person::getAge
2. 对象的实例方法引用语法：instancename::methodname 例如：System.out::println
3. 对象的超类方法引用语法： super::methodname
4. 类构造器引用语法： classname::new 例如：ArrayList::new
5. 数组构造器引用语法： typename[]::new 例如： String[]:new



### 闭包

> 函数`lazy_sum`中又定义了函数`sum`，并且，内部函数`sum`可以引用外部函数`lazy_sum`的参数和局部变量，当`lazy_sum`返回函数`sum`时，相关参数和变量都保存在返回的函数中，这种称为“闭包（Closure）”的程序结构拥有极大的威力。

* 闭包可以返回一个函数然后延迟执行
* 在没有`class`机制，只有函数的语言里，借助闭包，同样可以封装一个私有变量。

## Java函数式编程

