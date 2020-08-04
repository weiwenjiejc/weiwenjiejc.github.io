**列别名**



```shell
# 英文别名
select css008 serviceName from dwlesb.zs02;

# 中文列别名需要使用""，使用''不行
select css008 "服务名" from dwlesb.zs02;
```



**Oracle中不支持limit**

可以使用**minus(差集)**和**rownum**来实现



```shell
# 使用>=不行，只能使用<=
select css008 serviceName from dwlesb.zs02
where rownum <= 3;

#minus,差集，使用第一个集合减去第二个集合，下面这条语句相当于limit 3, 6
select css008 serviceName from dwlesb.zs02
where rownum <= 6
minus
select css008 serviceName from dwlesb.zs02
where rownum <= 3
```

**关键字**

不能使用关键字，作为列名，别名

```shell
# 关键字查询
select * from v$reserved_words

# desc，explain，comment都是关键字，不能使用
select * from v$reserved_words 
where keyword = 'DESC'
select * from v$reserved_words where keyword = upper('explain')

select * from v$reserved_words where keyword = upper('comment')
```

## Oracle字段

![img](images/20170509135251042)