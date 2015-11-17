package cz.cvut.fel.nutforms.localization.exception;

import java.util.MissingResourceException;

/**
 * @author klimesf
 */
public class BundleNotFound extends Throwable {

    public BundleNotFound(String message, Throwable cause) {
        super(message, cause);
    }
}
