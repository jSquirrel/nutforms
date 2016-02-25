package cz.cvut.fel.nutforms.localization;

import cz.cvut.fel.nutforms.localization.exception.BundleNotFound;
import cz.cvut.fel.nutforms.localization.exception.ClassNotFound;
import cz.cvut.fel.nutforms.localization.exception.ContextNotFound;
import cz.cvut.fel.nutforms.localization.exception.MessageNotFound;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.util.Map;

/**
 * @author klimesf
 */
public class MessageFinderTest {

    @Test
    public void testGetMessage() throws BundleNotFound, MessageNotFound {
        MessageFinder finder = new MessageFinder();
        Assert.assertEquals(finder.getMessage(new MessageQuery("en", "US", "edit", "cz.cvut.fel.nutforms.example.model.Bug", "form.submit.value"), "FormBundle"), "Edit");
        Assert.assertEquals(finder.getMessage(new MessageQuery("cs", "CZ", "edit", "cz.cvut.fel.nutforms.example.model.Bug", "form.submit.value"), "FormBundle"), "Upravit");
    }

    @Test(expectedExceptions = BundleNotFound.class)
    public void testGetMessageFromUndefinedBundle() throws BundleNotFound, MessageNotFound {
        MessageFinder finder = new MessageFinder();
        finder.getMessage(new MessageQuery("en", "US", "edit", "cz.cvut.fel.nutforms.example.model.Bug", "form.submit.value"), "UNDEFINED");
    }

    @Test(expectedExceptions = MessageNotFound.class)
    public void testGetMessageWithUndefinedName() throws BundleNotFound, MessageNotFound {
        MessageFinder finder = new MessageFinder();
        finder.getMessage(new MessageQuery("en", "US", "edit", "cz.cvut.fel.nutforms.example.model.Bug", "UNDEFINED"), "FormBundle");
    }

    @Test
    public void testGetMessages() throws BundleNotFound, ClassNotFound, ContextNotFound {
        MessageFinder finder = new MessageFinder();
        Map<String, String> messages = finder.getMessages(new MessageQuery("en", "US", "edit", "cz.cvut.fel.nutforms.example.model.Bug", null), "FormBundle");

        Assert.assertTrue(messages.containsKey("form.id.label"));
        Assert.assertEquals(messages.get("form.id.label"), "ID");
        Assert.assertTrue(messages.containsKey("form.submit.value"));
        Assert.assertEquals(messages.get("form.submit.value"), "Edit");
    }

    @Test(expectedExceptions = BundleNotFound.class)
    public void testGetMessagesFromUndefinedBundle() throws BundleNotFound, ClassNotFound, ContextNotFound {
        MessageFinder finder = new MessageFinder();
        Map<String, String> messages = finder.getMessages(new MessageQuery("en", "US", "edit", "cz.cvut.fel.nutforms.example.model.Bug", null), "UNDEFINED");
    }

    @Test(expectedExceptions = ContextNotFound.class)
    public void testGetMessagesOfUndefinedContext() throws ContextNotFound, BundleNotFound, ClassNotFound {
        MessageFinder finder = new MessageFinder();
        Map<String, String> messages = finder.getMessages(new MessageQuery("en", "US", "UNDEFINED", "cz.cvut.fel.nutforms.example.model.Bug", null), "FormBundle");
    }

    @Test(expectedExceptions = ClassNotFound.class)
    public void testGetMessagesOfUndefinedClass() throws ClassNotFound, BundleNotFound, ContextNotFound {
        MessageFinder finder = new MessageFinder();
        Map<String, String> messages = finder.getMessages(new MessageQuery("en", "US", "edit", "UNDEFINED", null), "FormBundle");
    }
}
