# nutforms/meta

Provides MetadataServlet, which serves entity metadata.

## Example

```GET localhost:8080/meta/class/cz.cvut.fel.nutforms.example.model.Bug```

```
{
    "attributes": [
        {
            "name": "description",
            "type": "java.lang.String",
            "is_primary": false
        },
        {
            "name": "log",
            "type": "java.lang.String",
            "is_primary": false
        },
        {
            "name": "id",
            "type": "java.lang.Long",
            "is_primary": true
        },
        {
            "name": "localizedDescription",
            "type": "java.lang.String",
            "is_primary": false
        }
    ],
    "relationships": [
        {
            "name": "project",
            "type": "ToOne",
            "target_entity": "cz.cvut.fel.nutforms.example.model.Project"
        }
    ]
}
```
