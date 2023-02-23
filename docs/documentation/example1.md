# Example 1

**URL** : `/some-url/:id`

**Method** : `GET`

**Auth required** : `YES`

**How to authenticate** : `Send token as a query sting parameter`

## Request example
```bash
curl --request GET \
     --url https://example.com/some-url/1?token="your-api-token"
```

## Response example

**Code** : `200 OK`

```json
{
    "code": 1000,
    "message": "Delivery information row by id",
    "data": {
        "id": 1,
        "orderId": 1,
        "customerName": "Igor"
    }
}
```

**Code** : `404 Not found`

```json
{
	"code": 3002,
	"httpCode": 404,
	"message": "Delivery information row was not found by id",
	"data": null
}
```

## Return type

> Returned data is of type `Object`

[filename1](../src/Types/ExampleType.ts ':include')


```
// Works also with Enums and Unifiers
// [filename2](../src/Unifiers/foo.ts ':include')
// [filename3](../src/Enums/bar.ts ':include')
```
