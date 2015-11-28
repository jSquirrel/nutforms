# nutforms/localization

Provides LocalizationServlet, which serves localization messages.

## Example

```GET localhost:8080/localization/cs_CZ/cz.cvut.fel.nutforms.example.model.Bug/edit```

```
{
{
    "form.description.label": "Popis",
    "form.id.label": "ID",
    "form.localizedDescription.label": "P\u0159eklad popisu",
    "form.log.label": "Log",
    "form.submit.value": "Upravit"
}
}
```


```GET localhost:8080/localization/cs_CZ/cz.cvut.fel.nutforms.example.model.Bug/edit/form.description.label```

```
Popis
```
