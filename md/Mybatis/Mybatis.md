

# Mybatis

## 1. mybatis结合spring使用

### 1.1 结合springboot使用，纯注解、无配置文件

> 使用@Mapper，@MapperScan配合使用，只适用于@SpringBootApplication方式，用来web启动

```java
package org.wwj.demo.mybatis.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface TestDao {

    @Select("select version()")
    String getVersion();
}

```



```java
package org.wwj.demo.mybatis;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
/*用来扫描@Mapper注解*/
@MapperScan(basePackages = "org.wwj.demo.mybatis.dao")
public class SpringbootApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootApplication.class, args);
    }

}

```

**application.yaml**

```yaml
spring:
  datasource:
    url: jdbc:oracle:thin:@10.1.50.2:1521:orcl
    driver-class-name: oracle.jdbc.driver.OracleDriver
    username: system
    password: oracledba
```



当参数函数参数为一个，或者两个的时候，不需要加@Param("serviceName") String serviceName，多个参数时，需要加@Param

```java
@Select("select css016 serviceOperationName from dwlesb.zs03 where css008 = #{serviceName}")
List<String> getAllOperation(String serviceName);
```



### 1.2 结合spring使用

maven环境

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.3</version>
</dependency>

<dependency>
    <groupId>com.oracle.database.jdbc</groupId>
    <artifactId>ojdbc6</artifactId>
    <version>11.2.0.4</version>
</dependency>
```

使用配置类启动

```java
package org.wwj.mybatis;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.wwj.mybatis.config.AppConfig;
import org.wwj.mybatis.mapper.MapperDemo;

import java.util.List;

public class SpringStartDemo{
    public static void main(String[] args) {
        ApplicationContext applicationContext;
        applicationContext = new AnnotationConfigApplicationContext(AppConfig.class);
        
        MapperDemo mapperDemo = applicationContext.getBean(MapperDemo.class);
        List<String> allTable = mapperDemo.getAllTable();
    }
}


```

配置类

```java
package org.wwj.mybatis.config;

import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
@MapperScan(basePackages = "org.wwj.mybatis.mapper")
@ComponentScan(basePackages = "org.wwj.mybatis")
public class AppConfig {
    
    @Bean
    public DriverManagerDataSource dataSource(){
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("oracle.jdbc.driver.OracleDriver");
        dataSource.setUrl("jdbc:oracle:thin:@10.1.50.2:1521:orcl");
        dataSource.setUsername("system");
        dataSource.setPassword("oracledba");
        return dataSource;
    }

    //dataSource会自动注入
    @Bean SqlSessionFactoryBean sqlSessionFactoryBean(DriverManagerDataSource dataSource){
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource);
        return sqlSessionFactoryBean;
    }
}

```

SQL语句接口

```java
package org.wwj.mybatis.mapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;

@Mapper
public interface MapperDemo {
    @Select("select t.table_name from user_tables t")
    List<String> getAllTable();
}

```





## 2. mybatis单独使用，不结合其它框架



### 2.1 配置文件

> 配置文件需要放在resources目录下，否则找不到

**mybatis-config.xml**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <properties resource="mybatis/config.properties">
        <!--<property name="username" value="dev_user"/>
        <property name="password" value="F2Fa3!33TYyg"/>-->
    </properties>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${driver}"/>
                <property name="url" value="${url}"/>
                <property name="username" value="${username}"/>
                <property name="password" value="${password}"/>
            </dataSource>
        </environment>
    </environments>
    <!--<mappers>
        <mapper resource="org/mybatis/example/BlogMapper.xml"/>
    </mappers>-->
    <mappers>
        <!--带有SQL的接口所在包-->
        <package name="org.wwj.alone.mybatis.mapper"/>
    </mappers>
</configuration>
```

**config.properties**

```properties
# oracle数据库jdbc
url=jdbc:oracle:thin:@10.1.50.2:1521:orcl
driver=oracle.jdbc.driver.OracleDriver
username=system
password=oracledba
```

### 2.2 src文件

SQL语句接口，使用注解SQL，不使用mapper xml文件

```java
package org.wwj.alone.mybatis.mapper;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.wwj.mybatis.pojo.ComplexParam;
import org.wwj.mybatis.pojo.OperationInfo;
import org.wwj.mybatis.pojo.OperationParam;

import java.util.List;

public interface ServiceInfoMapper {

    @Select("select t.table_name from user_tables t")
    List<String> getAllTable();
}

```

执行SQL语句类

```java
package org.wwj.alone.mybatis;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.wwj.alone.mybatis.mapper.ServiceInfoMapper;
import org.wwj.mybatis.pojo.ComplexParam;
import org.wwj.mybatis.pojo.OperationInfo;
import org.wwj.mybatis.pojo.OperationParam;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class MybatisTest {
    private static Logger logger = LoggerFactory.getLogger(MybatisTest.class);


    /**
     * SqlSessionFactory 一旦被创建就应该在应用的运行期间一直存在，
     * 没有任何理由丢弃它或重新创建另一个实例。
     * 因此 SqlSessionFactory 的最佳作用域是应用作用域。
     * 有很多方法可以做到，最简单的就是使用单例模式或者静态单例模式。
     */
    private static SqlSessionFactory sqlSessionFactory;

    static {
        logger.info("开始初始化SqlSessionFactory");
        String resource = "mybatis/mybatis-config.xml";
        InputStream inputStream = null;
        try {
            inputStream = Resources.getResourceAsStream(resource);
        } catch (IOException e) {
            e.printStackTrace();
        }
        /**
         * 每个基于 MyBatis 的应用都是以一个 SqlSessionFactory 的实例为核心
         */

        sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        logger.info("SqlSessionFactory初始化完成");
    }

    public static void main(String[] args) {

        try (SqlSession session = sqlSessionFactory.openSession()) {
            ServiceInfoMapper mapper = session.getMapper(ServiceInfoMapper.class);
            List<String> allTable = mapper.getAllTable();
            for (int i = 0; i < allTable.size(); i++) {
                System.out.println(allTable.get(i));
            }
        }

    }

}

```







# maven配置



spring结合mybatis所需的jar

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.3</version>
</dependency>
```



java连接Oracle的jdbc

```xml
<dependency>
    <groupId>com.oracle.database.jdbc</groupId>
    <artifactId>ojdbc8</artifactId>
    <version>19.7.0.0</version>
</dependency>
```



# 日志设置

SLF4J类似于Commons Logging，也是一个日志接口，而Logback类似于Log4j，是一个日志的实现。

**logback.xml**

```xml
<configuration>

    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <!-- encoders are assigned the type
             ch.qos.logback.classic.encoder.PatternLayoutEncoder by default -->
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <!--设置日志级别为info-->
    <root level="info">
        <appender-ref ref="STDOUT" />
    </root>
    <!--<root level="debug">
        <appender-ref ref="STDOUT" />
    </root>-->
</configuration>
```

