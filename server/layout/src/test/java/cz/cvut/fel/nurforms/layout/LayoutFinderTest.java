package cz.cvut.fel.nurforms.layout;

import cz.cvut.fel.nutforms.layout.LayoutFinder;
import cz.cvut.fel.nutforms.layout.exceptions.LayoutNotFound;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * @author klimesf
 */
public class LayoutFinderTest {

    @Test
    public void testFind() throws LayoutNotFound {
        LayoutFinder finder = new LayoutFinder();
        Assert.assertEquals("Lorem ipsum", finder.find("cz.cvut.fel.nutforms.example.model.Bug/edit"));
    }

    @Test(expectedExceptions = LayoutNotFound.class)
    public void testFindWithInvalidLayoutLame() throws LayoutNotFound {
        LayoutFinder finder = new LayoutFinder();
        finder.find("bug-new");
    }

}
