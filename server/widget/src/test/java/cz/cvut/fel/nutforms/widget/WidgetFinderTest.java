package cz.cvut.fel.nutforms.widget;

import cz.cvut.fel.nutforms.widget.exceptions.WidgetNotFound;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * @author klimesf
 */
public class WidgetFinderTest {

    @Test
    public void testFind() throws WidgetNotFound {
        WidgetFinder finder = new WidgetFinder();
        Assert.assertEquals("Lorem ipsum", finder.findWidget("default/text-input"));
    }

    @Test(expectedExceptions = WidgetNotFound.class)
    public void testFindWithInvalidLayoutLame() throws WidgetNotFound {
        WidgetFinder finder = new WidgetFinder();
        finder.findWidget("invalid-widget-name");
    }

}
