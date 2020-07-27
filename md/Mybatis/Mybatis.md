

# Mybatis

## mybatis-spring

### 注解、无配置文件

> 使用@Mapper，@MapperScan配合使用

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