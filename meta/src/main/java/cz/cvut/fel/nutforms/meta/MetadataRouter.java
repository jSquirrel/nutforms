package cz.cvut.fel.nutforms.meta;

import java.net.MalformedURLException;
import java.net.URL;

/**
 * @author klimesf
 */
public class MetadataRouter {

    private String entityName;

    /**
     * Creates MetadataRouter for given URL.
     *
     * @param url URL of the request.
     * @return
     */
    public static MetadataRouter createRouter(String url) {
        try {
            return new MetadataRouter(url);
        } catch (MalformedURLException e) {
            return null;
        }
    }

    /**
     * MetadataRouter constructor.
     *
     * @param url URL of the request.
     * @throws MalformedURLException
     */
    private MetadataRouter(String url) throws MalformedURLException {
        URL URL = new URL(url);
        this.entityName = this.parseEntityName(URL.getPath());
    }

    /**
     * Returns name of the entity.
     *
     * @return
     */
    public String getEntityName() {
        return entityName;
    }

    /**
     * Parses out name of the entity from the request.
     *
     * @param path URL path of the request.
     * @return Name of the entity.
     */
    private String parseEntityName(String path) {
        if (path.startsWith("/")) {
            path = path.substring(1);
        }

        String[] parts = path.split("/");
        return parts.length == 3 ? parts[2] : null; // /meta/class/<entity>
    }

}
