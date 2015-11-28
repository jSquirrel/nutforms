package cz.cvut.fel.nutforms.localization;

import cz.cvut.fel.nutforms.localization.exception.BadRequest;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * @author klimesf
 */
public class LocalizationRouterTest {

    @Test
    public void testRouteWithMessageName() throws BadRequest {
        MessageQuery query = LocalizationRouter.route("/cs_CZ/Bug/edit/msg");
        Assert.assertEquals(query.getLanguage(), "cs");
        Assert.assertEquals(query.getCountry(), "CZ");
        Assert.assertEquals(query.getClassName(), "Bug");
        Assert.assertTrue(query.hasMessageName());
        Assert.assertEquals(query.getMessageName(), "msg");
    }

    @Test
    public void testRouteWithoutMessageName() throws BadRequest {
        MessageQuery query = LocalizationRouter.route("/cs_CZ/Bug/edit");
        Assert.assertEquals(query.getLanguage(), "cs");
        Assert.assertEquals(query.getCountry(), "CZ");
        Assert.assertEquals(query.getClassName(), "Bug");
        Assert.assertFalse(query.hasMessageName());
        Assert.assertNull(query.getMessageName());
    }

}
