

# Mybatis

## mybatis-spring

### 注解、无配置文件

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

