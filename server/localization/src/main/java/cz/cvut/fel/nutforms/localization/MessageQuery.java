package cz.cvut.fel.nutforms.localization;

/**
 * @author klimesf
 */
class MessageQuery {

    private String language;

    private String country;

    private String className;

    private String context;

    private String messageName;

    public MessageQuery() {
    }

    public MessageQuery(String language, String country, String className, String context, String message) {
        this.language = language;
        this.country = country;
        this.className = className;
        this.context = context;
        this.messageName = message;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public String getMessageName() {
        return messageName;
    }

    public void setMessageName(String messageName) {
        this.messageName = messageName;
    }

    public boolean hasMessageName() {
        return this.messageName != null;
    }
}
