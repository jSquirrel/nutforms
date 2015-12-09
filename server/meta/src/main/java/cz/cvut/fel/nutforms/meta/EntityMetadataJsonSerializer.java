package cz.cvut.fel.nutforms.meta;

import cz.cvut.fel.adaptiverestfulapi.meta.model.Attribute;
import cz.cvut.fel.adaptiverestfulapi.meta.model.Entity;
import cz.cvut.fel.adaptiverestfulapi.meta.model.Relationship;

import java.util.Map;
import java.util.StringJoiner;

/**
 * @author klimesf
 */
public class EntityMetadataJsonSerializer {

    public String serialize(Entity entity) {

        StringBuilder sb = new StringBuilder();
        sb.append("{");
        sb.append(serializeAttributes(entity)).append(",");
        sb.append(serializeRelationships(entity));
        sb.append("}");
        return sb.toString();
    }

    private String serializeAttributes(Entity entity) {
        StringBuilder sb = new StringBuilder();
        sb.append("\"attributes\":[");
        StringJoiner stringJoiner = new StringJoiner(",");
        for (Map.Entry<String, Attribute> entry : entity.getAttributes().entrySet()) {
            if (entry.getValue().getSetter() == null) {
                // Skip attributes without setter
                continue;
            }
            StringBuilder attributeBuilder = new StringBuilder();
            attributeBuilder
                    .append("{")
                    .append("\"name\":")
                    .append("\"").append(entry.getValue().getShortName()).append("\"").append(",")
                    .append("\"type\":")
                    .append("\"").append(entry.getValue().getAttributeType().getTypeName()).append("\"").append(",")
                    .append("\"is_primary\":")
                    .append(entry.getValue().isPrimary())
                    .append("}");
            stringJoiner.add(attributeBuilder.toString());
        }
        sb.append(stringJoiner.toString());
        sb.append("]");
        return sb.toString();
    }

    private String serializeRelationships(Entity entity) {
        StringBuilder sb = new StringBuilder();
        sb.append("\"relationships\":[");
        StringJoiner stringJoiner = new StringJoiner(",");
        for (Map.Entry<String, Relationship> entry : entity.getRelationships().entrySet()) {
            if (entry.getValue().getSetter() == null) {
                // Skip relationships without setter
                continue;
            }
            StringBuilder attributeBuilder = new StringBuilder();
            attributeBuilder
                    .append("{")
                    .append("\"name\":")
                    .append("\"").append(entry.getValue().getShortName()).append("\"").append(",")
                    .append("\"type\":")
                    .append("\"").append(entry.getValue().getRelationshipType()).append("\"").append(",")
                    .append("\"target_entity\":")
                    .append("\"").append(entry.getValue().getTargetEntity()).append("\"")
                    .append("}");
            stringJoiner.add(attributeBuilder.toString());
        }
        sb.append(stringJoiner.toString());
        sb.append("]");
        return sb.toString();
    }

}
